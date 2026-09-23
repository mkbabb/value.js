import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
const D = new URL(".", import.meta.url).pathname;
const K = "/Users/mkbabb/Programming/keyframes.js";
const ks = () => execSync(`git -C ${K} rev-parse --short HEAD`).toString().trim() + " dirty=" + execSync(`git -C ${K} status --porcelain | wc -l`).toString().trim();
const out = { k0: ks() };
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto("http://localhost:5173/#/amiga"); await p.waitForTimeout(3500);
const rect = { x: 518, y: 127, width: 878, height: 646 };
out.timing = await p.evaluate(() => { let i = document.querySelector("canvas.amiga-canvas").__vueParentComponent; while (i && !(i.setupState && i.setupState.animationGroup)) i = i.parent; const g = i.setupState.animationGroup; return g.getEntries().map(e => { const tf = e.animation.options.timingFunction; let s; try { s = JSON.stringify(tf).slice(0, 120); } catch { s = String(tf); } return e.animation.name + " tf=" + s + " frames=" + (e.animation.frames?.map?.(f => (f.timingFunction?.name ?? typeof f.timingFunction)).join("/") ?? "?"); }); });
const pose = () => p.evaluate(() => { const q = window.__kfAmigaProbe.pose(); return [+q.px.toFixed(3), +q.py.toFixed(3), +q.spin.toFixed(3), q.playing]; });
const btn = (label) => p.evaluate((label) => [...document.querySelectorAll(`button[aria-label="${label}"]`)].map(b => { const r = b.getBoundingClientRect(); const s = getComputedStyle(b); return { x: r.x + r.width / 2, y: r.y + r.height / 2, w: r.width, vis: s.visibility, op: s.opacity, disp: s.display }; }), label);
out.resetBtns = await btn("Reset animation"); out.darkBtns = await btn("Switch to dark mode");
// scrub: grab thumb at (91, 512) and drag right along the track
await p.mouse.move(91, 512); await p.mouse.down();
const scrub = [];
for (let k = 1; k <= 8; k++) { await p.mouse.move(91 + k * 40, 512, { steps: 3 }); await p.waitForTimeout(150); scrub.push(await pose()); }
await p.mouse.up(); await p.waitForTimeout(1200);
out.scrub = scrub; out.poseAfterScrub = await pose();
await p.screenshot({ path: D + "transport-after-scrub.png", clip: rect });
const r0 = out.resetBtns.find(r => r.w > 0);
if (r0) { await p.mouse.click(r0.x, r0.y); await p.waitForTimeout(1500); out.poseAfterReset = await pose(); }
out.k1 = ks();
console.log(JSON.stringify(out, null, 1));
await b.close();

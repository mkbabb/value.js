// amiga-scene probe 3 — READ-ONLY; headed Chromium. Tab-focus ring on the subject; pause/reset settle; X linearity on a fresh load w/o touching the channel select.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
const OUT = new URL(".", import.meta.url).pathname;
const TREE = "/Users/mkbabb/Programming/keyframes.js";
const out = { sha: execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim(), dirty: execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length };
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const p = await ctx.newPage();
await p.goto("http://localhost:5173/#/amiga", { waitUntil: "networkidle" }); await p.waitForTimeout(3500);
const pose = () => p.evaluate(() => { const q = window.__kfAmigaProbe.pose(); return [+q.px.toFixed(3), +q.py.toFixed(3), +q.spin.toFixed(3), q.playing]; });
// Tab walk to the canvas
out.tabWalk = [];
for (let i = 0; i < 30; i++) { await p.keyboard.press("Tab"); await p.waitForTimeout(120); const a = await p.evaluate(() => { const e = document.activeElement; return e.tagName + ":" + (e.getAttribute("aria-label") || e.textContent.trim()).slice(0, 30) + (e.classList.contains("amiga-canvas") ? " <<CANVAS fv=" + e.matches(":focus-visible") + " outline=" + getComputedStyle(e).outline + " shadow=" + getComputedStyle(e).boxShadow.slice(0, 120) : ""); }); out.tabWalk.push(a); if (a.includes("<<CANVAS")) { await p.screenshot({ path: OUT + "p3-tab-focus-canvas-1440-light.png" }); break; } }
// fresh-load play via the canvas-independent transport keyboard? use the transport button
const clickVis = async (name) => { const bs = p.getByRole("button", { name, exact: true }); const n = await bs.count(); for (let i = 0; i < n; i++) if (await bs.nth(i).isVisible()) { await bs.nth(i).click(); return true; } return false; };
const hov = async () => { const bb = await p.getByRole("combobox", { name: "Select animation" }).first().boundingBox(); await p.mouse.move(bb.x + 5, bb.y + 5); await p.waitForTimeout(700); };
await hov(); out.play = await clickVis("Play animation");
const t0 = Date.now(); const xs = []; for (let i = 0; i < 60; i++) { const q = await pose(); xs.push([Date.now() - t0, q[0], q[2]]); await p.waitForTimeout(40); }
out.xTrace = xs;
await hov(); out.pause = await clickVis("Pause animation"); const tp = Date.now();
const ps = []; for (let i = 0; i < 20; i++) { ps.push([Date.now() - tp, ...(await pose())]); await p.waitForTimeout(60); } out.afterPause = ps;
await hov(); await clickVis("Play animation"); await p.waitForTimeout(700); await hov(); out.reset = await clickVis("Reset animation"); const tr = Date.now();
const rs = []; for (let i = 0; i < 20; i++) { rs.push([Date.now() - tr, ...(await pose())]); await p.waitForTimeout(60); } out.afterReset = rs;
await p.mouse.move(5, 450); await p.waitForTimeout(3000); out.afterReset3s = await pose();
await p.screenshot({ path: OUT + "p3-after-reset-3s-1440-light.png" });
console.log(JSON.stringify(out));
await b.close();

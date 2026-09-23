// cube-scene touch probe (390, hasTouch): pause, then one-finger orbit, then two-finger pinch-out; READ-ONLY.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const TREE = "/Users/mkbabb/Programming/keyframes.js";
const sha = execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim(); const dirty = execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, colorScheme: "light" });
const page = await ctx.newPage(); const errs = []; page.on("pageerror", e => errs.push(String(e)));
await page.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" }); await page.waitForTimeout(3500);
const st = () => page.evaluate(() => { const roll = document.querySelector(".idle-hover"); const orb = roll.parentElement; const c = document.querySelector(".cube").getBoundingClientRect(); return { orb: getComputedStyle(orb).transform.slice(0, 90), cube: getComputedStyle(document.querySelector(".cube")).transform.slice(0, 60), box: [Math.round(c.width), Math.round(c.height)] }; });
// pause via transport (tap)
const p = page.getByRole("button", { name: "Pause animation" }); for (let i = 0; i < await p.count(); i++) { const bb = await p.nth(i).boundingBox(); if (bb && bb.width) { await page.touchscreen.tap(bb.x + bb.width / 2, bb.y + bb.height / 2); break; } }
await page.waitForTimeout(900);
const out = { sha, dirty, s0: await st() };
const cdp = await ctx.newCDPSession(page);
const bx = await page.locator(".cube").first().boundingBox(); const c = { x: bx.x + bx.width / 2, y: bx.y + bx.height / 2 };
const tp = (pts) => pts.map(([x, y], id) => ({ x, y, id }));
await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: tp([[c.x, c.y]]) });
for (let k = 1; k <= 10; k++) { await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: tp([[c.x + k * 10, c.y + k * 3]]) }); await page.waitForTimeout(16); }
await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] }); await page.waitForTimeout(100);
out.s1_afterOrbit100 = await st(); await page.screenshot({ path: OUT + "13a-touch-paused-orbit-390touch-light.png" });
await page.waitForTimeout(2000); out.s2_settled = await st();
await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: tp([[c.x - 30, c.y - 5], [c.x + 30, c.y + 5]]) });
for (let k = 1; k <= 12; k++) { await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: tp([[c.x - 30 - k * 7, c.y - 5 - k], [c.x + 30 + k * 7, c.y + 5 + k]]) }); await page.waitForTimeout(16); }
await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] }); await page.waitForTimeout(600);
out.s3_afterPinch = await st(); await page.screenshot({ path: OUT + "13b-touch-paused-pinch-out-390touch-light.png" });
out.errs = errs; writeFileSync(OUT + "touch-probe.json", JSON.stringify(out, null, 1)); console.log(JSON.stringify(out, null, 1));
await b.close();

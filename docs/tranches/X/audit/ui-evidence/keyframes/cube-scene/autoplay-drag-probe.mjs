// cube-scene: does the orbital drag act while the scene AUTOPLAYS on entry vs after an explicit Play? READ-ONLY.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process"; import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const TREE = "/Users/mkbabb/Programming/keyframes.js";
const sha = execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim(); const dirty = execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" }); await page.waitForTimeout(3500);
const orb = () => page.evaluate(() => getComputedStyle(document.querySelector(".idle-hover").parentElement).transform.slice(0, 60));
const drag = async (dx) => { const bx = await page.locator(".cube").first().boundingBox(); const c = { x: bx.x + bx.width / 2, y: bx.y + bx.height / 2 }; await page.mouse.move(c.x, c.y); await page.mouse.down(); for (let k = 1; k <= 10; k++) { await page.mouse.move(c.x + k * dx, c.y); await page.waitForTimeout(16); } await page.mouse.up(); await page.waitForTimeout(1500); };
const out = { sha, dirty };
out.autoplay_before = await orb(); await drag(25); out.autoplay_afterDrag = await orb();
await page.screenshot({ path: OUT + "14a-autoplay-after-drag-1440-light.png" });
const tb = async (name) => { const p = page.getByRole("button", { name }); for (let i = 0; i < await p.count(); i++) { const bb = await p.nth(i).boundingBox(); if (bb && bb.width) { await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await page.waitForTimeout(600); await p.nth(i).click(); await page.waitForTimeout(800); return true; } } return false; };
out.paused = await tb("Pause animation"); out.pausedOrb = await orb();
out.played = await tb("Play animation"); out.replay_before = await orb(); await drag(-25); out.replay_afterDrag = await orb();
await page.screenshot({ path: OUT + "14b-explicit-play-after-drag-1440-light.png" });
writeFileSync(OUT + "autoplay-drag-probe.json", JSON.stringify(out, null, 1)); console.log(out); await b.close();

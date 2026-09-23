// CONFIRM seat: where does a human-style hover-then-press on the collapsed pill's play mirror land?
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs"; import path from "node:path"; import { execSync } from "node:child_process";
const OUT = path.dirname(new URL(import.meta.url).pathname) + "/interact";
const kf = "/Users/mkbabb/Programming/keyframes.js";
const r = { khead: execSync(`git -C ${kf} rev-parse --short HEAD`).toString().trim(), kdirty: execSync(`git -C ${kf} status --porcelain | wc -l`).toString().trim() };
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
const playBtns = () => page.evaluate(() => [...document.querySelectorAll('button[aria-label="Play animation"],button[aria-label="Pause animation"]')].map((b) => { const x = b.getBoundingClientRect(); return { label: b.getAttribute("aria-label"), vis: x.width > 0 && getComputedStyle(b).visibility !== "hidden" && +getComputedStyle(b).opacity > 0.1, rect: [x.x, x.y, x.width, x.height].map(Math.round) }; }));
const hit = (x, y) => page.evaluate(([x, y]) => { const e = document.elementFromPoint(x, y); const b = e && e.closest("button"); return { tag: e && e.tagName, cls: e && String(e.className).slice(0, 60), btn: b && b.getAttribute("aria-label") }; }, [x, y]);
const cube = () => page.evaluate(() => document.querySelector(".cube").style.transform.slice(0, 40));
await page.goto("http://localhost:5173/#/cube", { waitUntil: "domcontentloaded" });
await page.waitForSelector(".cube"); await page.waitForTimeout(2500);
await page.getByRole("button", { name: "Reset animation" }).first().click();
await page.mouse.move(200, 850); await page.waitForTimeout(4500);
r.before = await playBtns();
const v = r.before.find((b) => b.vis && b.label === "Play animation");
const cx = v.rect[0] + v.rect[2] / 2, cy = v.rect[1] + v.rect[3] / 2; r.point = [cx, cy];
r.hitBeforeHover = await hit(cx, cy);
await page.mouse.move(cx, cy, { steps: 8 });
for (const ms of [0, 60, 150, 300, 600]) { if (ms) await page.waitForTimeout(ms === 60 ? 60 : ms - [0,60,150,300,600][[0,60,150,300,600].indexOf(ms)-1]); r[`hit@${ms}`] = await hit(cx, cy); }
r.afterHover = await playBtns();
await page.screenshot({ path: `${OUT}/confirm-dock-hovered.png`, clip: { x: 420, y: 740, width: 600, height: 110 } });
await page.mouse.down(); await page.mouse.up();
await page.waitForTimeout(600);
r.afterPress = await playBtns(); r.cubeA = await cube(); await page.waitForTimeout(500); r.cubeB = await cube();
fs.writeFileSync(OUT + "/confirm-play-click.json", JSON.stringify(r, null, 1));
await browser.close();

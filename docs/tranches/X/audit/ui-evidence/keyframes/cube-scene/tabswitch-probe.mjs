// cube-scene: does switching the Controls-tab surface halt the playing scene? READ-ONLY.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process"; import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const TREE = "/Users/mkbabb/Programming/keyframes.js";
const sha = execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim(); const dirty = execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const b = await chromium.launch({ headless: false }); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" }); const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" }); await page.waitForTimeout(3500);
const moving = async () => { const a = await page.evaluate(() => getComputedStyle(document.querySelector(".cube")).transform); await page.waitForTimeout(500); const c = await page.evaluate(() => getComputedStyle(document.querySelector(".cube")).transform); return a !== c; };
const btns = () => page.evaluate(() => [...document.querySelectorAll("button")].filter(e => /(Play|Pause) animation/.test(e.getAttribute("aria-label") || "")).map(e => e.getAttribute("aria-label") + (e.getBoundingClientRect().width ? "" : "(hidden)")));
const hover = async () => { const g = await page.locator(".glass-dock").first().boundingBox(); await page.mouse.move(g.x + g.width / 2, g.y + g.height / 2); await page.waitForTimeout(1100); };
const pick = async (name) => { await hover(); await page.getByRole("combobox", { name: "Controls tab" }).first().click(); await page.waitForTimeout(600); await page.getByRole("option", { name }).first().click(); await page.waitForTimeout(1200); await page.mouse.move(5, 450); await page.waitForTimeout(600); };
const out = { sha, dirty, t0: { moving: await moving(), btns: await btns() } };
await hover(); out.afterDockHover = { moving: await moving(), btns: await btns() };
await pick("Keyframes"); out.afterKeyframes = { moving: await moving(), btns: await btns() };
await page.screenshot({ path: OUT + "17-after-tab-keyframes-while-playing-1440-light.png" });
await pick("Controls"); out.afterBackToControls = { moving: await moving(), btns: await btns() };
writeFileSync(OUT + "tabswitch-probe.json", JSON.stringify(out, null, 1)); console.log(JSON.stringify(out)); await b.close();

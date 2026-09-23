// cube-scene: measure radii/fonts of the cube's controls surfaces (Controls / Matrix Controls / Keyframes). READ-ONLY.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process"; import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const TREE = "/Users/mkbabb/Programming/keyframes.js";
const sha = execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim(); const dirty = execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const b = await chromium.launch({ headless: false }); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" }); const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" }); await page.waitForTimeout(3500);
const m = () => page.evaluate(() => { const vis = (e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.x > 0; }; const d = (e) => { const r = e.getBoundingClientRect(), c = getComputedStyle(e); return `${e.tagName}.${String(e.className).split(" ").slice(0, 3).join(".")} slot=${e.getAttribute("data-slot")} ${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)} rad=${c.borderTopLeftRadius} font=${c.fontSize}/${c.fontWeight} bg=${c.backgroundColor} txt=${(e.textContent || "").trim().slice(0, 18)}`; };
  return { cards: [...document.querySelectorAll("[data-slot=card], .glass-card, [class*=card]")].filter(vis).slice(0, 8).map(d), buttons: [...document.querySelectorAll("button")].filter(vis).filter(e => e.getBoundingClientRect().x < 480).map(d), rail: [...document.querySelectorAll("[class*=progress-ball],[class*=progress-rail],[role=slider]")].filter(vis).map(e => d(e) + " aria=" + e.getAttribute("aria-label")) }; });
const out = { sha, dirty, controls: await m() };
const vp = page.viewportSize(); const hover = async () => { const g = await page.locator(".glass-dock").first().boundingBox(); await page.mouse.move(g.x + g.width / 2, g.y + g.height / 2); await page.waitForTimeout(1100); };
const pick = async (name) => { await hover(); await page.getByRole("combobox", { name: "Controls tab" }).first().click(); await page.waitForTimeout(600); await page.getByRole("option", { name }).first().click(); await page.waitForTimeout(900); await page.mouse.move(5, 450); await page.waitForTimeout(600); };
// select Matrix channel via transport
const tr = page.getByRole("combobox", { name: "Select animation" }).first(); await tr.click(); await page.waitForTimeout(600); await page.getByRole("option", { name: "Matrix" }).first().click(); await page.waitForTimeout(800);
await pick("Matrix Controls"); out.matrix = await m();
await pick("Keyframes"); out.keyframes = await m();
await page.screenshot({ path: OUT + "16-keyframes-pane-1440-light.png", clip: { x: 50, y: 40, width: 460, height: 640 } });
writeFileSync(OUT + "radius-probe.json", JSON.stringify(out, null, 1)); console.log(JSON.stringify(out, null, 1)); await b.close();

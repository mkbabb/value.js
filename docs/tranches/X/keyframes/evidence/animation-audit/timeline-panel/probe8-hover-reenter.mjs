// timeline-panel — probe8: (a) hover preview with a VALID built animation (import) → does html2canvas succeed?
// (b) second Timeline open (chunk cached) → does the empty-card frame / ribbon jump recur? (screencast)
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const kf = (c) => execSync(`git -C /Users/mkbabb/Programming/keyframes.js ${c}`).toString().trim();
console.log("khead", kf("rev-parse --short HEAD"), "kdirty", kf("status --porcelain").split("\n").filter(Boolean).length);
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.addInitScript(() => { window.__v = (sel) => [...document.querySelectorAll(sel)].find((e) => e.checkVisibility()); });
await page.goto("http://localhost:5173/#/cube", { waitUntil: "load" }); await page.waitForTimeout(5000);
const pick = async (re) => { await page.mouse.move(720, 70); await page.waitForTimeout(700); await page.locator('[aria-label="Controls tab"]').click({ force: true }); await page.waitForTimeout(500); await page.locator('[role=option]', { hasText: re }).first().click(); };
await pick(/timeline/i); await page.waitForTimeout(1500);
await page.getByRole("button", { name: /^Import$/ }).first().click(); await page.waitForTimeout(700);
await page.locator("[role=dialog] textarea").fill("@keyframes spin { 0% { transform: rotateX(0deg); } 100% { transform: rotateX(180deg); } }");
await page.locator("[role=dialog]").getByRole("button", { name: /^Import$/ }).click(); await page.waitForTimeout(1500); await page.mouse.move(1300, 850); await page.waitForTimeout(600);
await page.screenshot({ path: OUT + "I0-after-import-pane.png", clip: { x: 66, y: 60, width: 416, height: 420 } });
await page.locator(".timeline-track:visible [role=slider]").nth(1).hover({ force: true }); await page.waitForTimeout(3000);
const tip = await page.evaluate(() => { const t = [...document.querySelectorAll("[data-reka-popper-content-wrapper], [role=tooltip]")].find((e) => e.checkVisibility()); const img = t?.querySelector("img"); return { text: t?.innerText.slice(0, 160), img: img ? [img.naturalWidth, img.naturalHeight] : null }; });
console.log("hover(valid anim):", JSON.stringify(tip));
await page.screenshot({ path: OUT + "G-hover-diamond-valid-anim.png", clip: { x: 0, y: 0, width: 720, height: 600 } });
await page.mouse.move(1300, 850); await page.waitForTimeout(500);
await pick(/^controls$/i); await page.waitForTimeout(1200);
// (b) second open, screencast
const cdp = await page.context().newCDPSession(page); const frames = [];
const h = (f) => { frames.push({ ts: f.metadata.timestamp, data: f.data }); cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {}); };
cdp.on("Page.screencastFrame", h);
await page.mouse.move(720, 70); await page.waitForTimeout(700); await page.locator('[aria-label="Controls tab"]').click({ force: true }); await page.waitForTimeout(500);
await cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1 }); await page.waitForTimeout(150);
const t0 = Date.now() / 1000; await page.locator('[role=option]', { hasText: /timeline/i }).first().click(); await page.waitForTimeout(800);
await cdp.send("Page.stopScreencast");
fs.mkdirSync(OUT + "A2-reenter", { recursive: true });
const idx = frames.map((f, i) => { const file = `f${String(i).padStart(3, "0")}.png`; fs.writeFileSync(OUT + "A2-reenter/" + file, Buffer.from(f.data, "base64")); return { i, file, label: `${Math.round((f.ts - t0) * 1000)}ms` }; });
fs.writeFileSync(OUT + "A2-reenter/index.json", JSON.stringify(idx)); console.log("A2 frames", idx.length);
await browser.close();

// probe-hardfail — READ-ONLY: a buffer that cannot parse; is there any visible error state? (1440 light)
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process"; import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const TREE = "/Users/mkbabb/Programming/keyframes.js";
const rev = () => execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim() + "+" + execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const browser = await chromium.launch({ headless: false }); const res = { kf: rev(), cons: [] };
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" }); const page = await ctx.newPage();
page.on("console", (m) => { if (m.type() === "error") res.cons.push(m.text().slice(0, 200)); });
await page.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" }); await page.waitForTimeout(3500);
const b = await page.locator(".glass-dock").first().boundingBox(); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1100);
await page.locator('[aria-label="Controls tab"]').first().click(); await page.waitForTimeout(700);
await page.getByRole("option", { name: /^Keyframes/ }).first().click(); await page.waitForTimeout(2500); await page.mouse.move(1435, 5); await page.waitForTimeout(500);
const vl = await page.locator(".monaco-pane .monaco-editor .view-lines").first().boundingBox();
await page.mouse.click(vl.x + 150, vl.y + 70); await page.keyboard.press("Meta+a"); await page.keyboard.type("@keyframes x { 0% { transform: rotate( ; ", { delay: 15 });
const st = () => page.evaluate(() => { const w = document.querySelector(".monaco-pane .relative"); return { wellTransform: w ? getComputedStyle(w).transform : null, toasts: [...document.querySelectorAll("[data-sonner-toast]")].map(t => [t.textContent.trim().slice(0, 120), Math.round(t.getBoundingClientRect().y)]), markers: document.querySelectorAll(".monaco-pane .squiggly-error, .monaco-pane .cdr").length, alerts: [...document.querySelectorAll("[role=alert]")].filter(a => a.getBoundingClientRect().height > 0).map(a => a.textContent.trim().slice(0, 80)) }; });
const samples = []; for (let t = 0; t < 2400; t += 120) { samples.push({ t, ...(await st()) }); if (t === 360) await page.screenshot({ path: OUT + "22-hardfail-mid-1440-light.png" }); await page.waitForTimeout(120); }
await page.screenshot({ path: OUT + "23-hardfail-settled-1440-light.png" });
res.samples = samples; writeFileSync(OUT + "probe-hardfail-log.json", JSON.stringify(res, null, 2));
console.log(res.kf, JSON.stringify(res.cons.slice(0, 5))); for (const s of samples) console.log(s.t, s.wellTransform, JSON.stringify(s.toasts), s.markers, JSON.stringify(s.alerts));
await browser.close();

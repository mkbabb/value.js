// square-scene probe3 — measured tour period vs the Controls (5s/alternate) and the Keyframes CSS (2000ms/normal). READ-ONLY.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process"; import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const TREE = "/Users/mkbabb/Programming/keyframes.js";
const sha = execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim(); const dirty = execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const page = await ctx.newPage(); await page.goto("http://localhost:5173/#/square", { waitUntil: "networkidle" }); await page.waitForTimeout(3500);
const MODE = process.argv[2]; if (MODE === "edit") { const d = page.locator("[role=tabpanel][data-state=active] input").first(); await d.click(); await d.fill("1s"); await d.press("Enter"); await page.waitForTimeout(500); } await page.locator(".square-stage .demo-box").focus(); await page.keyboard.press("Space"); await page.waitForTimeout(200);
const samples = await page.evaluate(async () => { const out = []; const t0 = performance.now(); while (performance.now() - t0 < 9000) { const m = new DOMMatrix(getComputedStyle(document.querySelector(".square-stage .demo-box")).transform); out.push([Math.round(performance.now() - t0), Math.round(m.e), Math.round(m.f)]); await new Promise(r => setTimeout(r, 50)); } return out; });
// times when the box passes through the origin-ish (|e|,|f| < 6)
const home = samples.filter(([, e, f]) => Math.abs(e) < 8 && Math.abs(f) < 8).map(s => s[0]);
const corners = samples.filter(([, e, f]) => Math.abs(e) > 80 || Math.abs(f) > 80).map(s => s[0] + ":" + s[1] + "," + s[2]);
writeFileSync(OUT + "probe3" + (MODE ? "-" + MODE : "") + ".json", JSON.stringify({ sha, dirty, home, corners: corners.filter((_, i) => i % 3 === 0), n: samples.length }, null, 1)); console.log(JSON.stringify({ sha, dirty, home, corners: corners.filter((_, i) => i % 3 === 0) })); await b.close();

// square-scene probe — tab switch state + controls/CSS agreement + transport rest. READ-ONLY.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process"; import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const TREE = "/Users/mkbabb/Programming/keyframes.js";
const sha = execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim(); const dirty = execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const page = await ctx.newPage(); await page.goto("http://localhost:5173/#/square", { waitUntil: "networkidle" }); await page.waitForTimeout(3500);
const st = () => page.evaluate(() => { const bx = document.querySelector(".square-stage .demo-box"); const cs = getComputedStyle(bx); return { badge: document.querySelector(".square-telemetry .status-badge")?.textContent.trim(), tether: getComputedStyle(document.querySelector(".square-tether")).opacity, bg: cs.backgroundColor, fill: cs.getPropertyValue("--subject-fill").trim().slice(0, 40), tf: cs.transform.slice(0, 50), mode: bx.dataset.squareMode, demoBoxes: document.querySelectorAll(".demo-box").length }; });
const hoverTopDock = async () => { const bb = await page.locator(".glass-dock").first().boundingBox(); await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await page.waitForTimeout(1100); };
const pickTab = async (name) => { await hoverTopDock(); await page.getByRole("combobox", { name: "Controls tab" }).first().click(); await page.waitForTimeout(600); await page.getByRole("option", { name }).first().click(); await page.waitForTimeout(900); await page.mouse.move(3, 450); };
const out = { sha, dirty };
out.load = await st();
out.controls = await page.evaluate(() => { const p = document.querySelector("[role=tabpanel][data-state=active]"); return [...p.querySelectorAll("input,button[role=combobox]")].slice(0, 6).map(e => e.value || e.textContent.trim()); });
await pickTab("Keyframes"); out.afterKeyframesTab = await st();
out.css = await page.evaluate(() => { const t = document.querySelector("[role=tabpanel][data-state=active]")?.innerText || ""; return t.split("\n").filter(l => /duration|direction|iteration|timing|fill/.test(l)).slice(0, 12); });
await page.waitForTimeout(4000); out.keyframesTab4s = await st();
await page.screenshot({ path: OUT + "p1-after-keyframes-tab-4s-1440-light.png" });
await pickTab("Controls"); await page.waitForTimeout(3000); out.backToControls3s = await st();
// transport rest when pointer is far away
out.transport = await page.evaluate(() => { const bs = [...document.querySelectorAll("button")].filter(e => /Play animation|Pause animation/.test(e.getAttribute("aria-label") || "")); return bs.map(e => { const r = e.getBoundingClientRect(); const d = e.closest("[class*=dock]"); const dr = d?.getBoundingClientRect(); return { r: [r.x, r.y, r.width, r.height].map(Math.round), dock: d?.className.slice(0, 60), dr: dr && [dr.x, dr.y, dr.width, dr.height].map(Math.round), text: d?.innerText.replace(/\s+/g, " ").slice(0, 60) }; }); });
// fresh reload, no interaction, only a tab switch
await page.reload({ waitUntil: "networkidle" }); await page.waitForTimeout(3500); out.fresh = await st();
await page.mouse.move(3, 450); await page.waitForTimeout(1200); out.freshTransport = await page.evaluate(() => [...document.querySelectorAll(".glass-dock")].map(d => { const r = d.getBoundingClientRect(); return { r: [r.x, r.y, r.width, r.height].map(Math.round), text: d.innerText.replace(/\s+/g, " ").slice(0, 50) }; }));
await pickTab("Timeline"); await page.waitForTimeout(3000); out.freshAfterTimelineTab = await st();
await page.screenshot({ path: OUT + "p2-fresh-timeline-tab-1440-light.png" });
writeFileSync(OUT + "probe.json", JSON.stringify(out, null, 1)); console.log(JSON.stringify(out, null, 1)); await b.close();

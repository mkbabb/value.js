// Probe: can the Timeline tab's inline per-stop CSS editor take focus by pointer? READ-ONLY.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const CSS = `@keyframes demo { 0% { transform: rotate(0deg); } 50% { transform: rotate(90deg); } 100% { transform: rotate(180deg); } }`;
const b = await chromium.launch({ headless: false }); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" }); await page.waitForTimeout(3000);
const d = await page.locator(".glass-dock").first().boundingBox(); await page.mouse.move(d.x + d.width / 2, d.y + d.height / 2); await page.waitForTimeout(1000);
await page.locator('[aria-label="Controls tab"]').first().click(); await page.waitForTimeout(600); await page.getByRole("option", { name: /^Timeline/ }).click(); await page.waitForTimeout(2000);
await page.getByRole("button", { name: "Import", exact: true }).click(); await page.waitForTimeout(700);
await page.locator("[role=dialog] textarea").first().fill(CSS); await page.locator("[role=dialog] button", { hasText: /^Import/ }).last().click(); await page.waitForTimeout(1800);
await page.locator(".keyframe-marker").nth(1).click(); await page.waitForTimeout(1200);
const SEL = ".card-content:has(.timeline-preview-stage) .monaco-editor";
const res = {};
res.hit = await page.evaluate((s) => { const e = document.querySelector(s); const r = e.getBoundingClientRect(); const pts = [[r.x + 60, r.y + 15], [r.x + r.width / 2, r.y + r.height / 2]]; return pts.map(([x, y]) => { const h = document.elementFromPoint(x, y); return { x, y, inside: e.contains(h), hit: h?.tagName + "." + String(h?.className).slice(0, 80), pe: getComputedStyle(e).pointerEvents }; }); }, SEL);
const vl = await page.locator(SEL + " .view-lines").boundingBox();
await page.mouse.click(vl.x + 80, vl.y + 10); await page.waitForTimeout(400);
res.afterMouseClick = await page.evaluate(() => { const a = document.activeElement; return a.tagName + " " + (a.getAttribute("aria-label") || "") + " " + String(a.className).slice(0, 60); });

res.afterProgrammaticFocus = await page.evaluate(() => { const a = document.activeElement; return a.tagName + " " + (a.getAttribute("aria-label") || "") + " " + String(a.className).slice(0, 60); });
await page.keyboard.press("End"); res.afterEnd = await page.evaluate(() => document.activeElement.className.toString().slice(0,40)); res.trace = []; for (const ch of ["Enter", ..."color: red;"]) { if (ch === "Enter") await page.keyboard.press("Enter"); else await page.keyboard.type(ch); await page.waitForTimeout(120); res.trace.push(ch + "=>" + await page.evaluate((s) => document.activeElement.className.toString().slice(0,22) + " | " + [...document.querySelectorAll(s + " .view-line")].map(l => l.textContent).join(" / "), SEL)); } await page.waitForTimeout(1200);
res.textAfter = await page.evaluate((s) => [...document.querySelectorAll(s + " .view-line")].map(l => l.textContent).join(" | "), SEL);
res.errorShown = await page.evaluate(() => document.getElementById("kf-css-editor-error")?.textContent?.trim() || null);
await page.screenshot({ path: OUT + "41-probe-typing-valid-1440-light.png" });
writeFileSync(OUT + "probe-editor-typing.json", JSON.stringify(res, null, 2)); console.log(JSON.stringify(res, null, 1));
await b.close();

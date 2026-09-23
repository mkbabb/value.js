// Matrix→Rotations fallback + pointer-pick focus ring + keyboard reach — READ-ONLY; headed Chromium.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const TREE = "/Users/mkbabb/Programming/keyframes.js";
const sha = execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim();
const dirty = execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const log = { sha, dirty, when: new Date().toISOString(), steps: [] };
const browser = await chromium.launch({ headless: false });
const info = (page) => page.evaluate(() => { const t = document.querySelector('[aria-label="Controls tab"]'); const c = t && getComputedStyle(t);
  const lb = document.querySelector("[role=listbox]"); const content = lb && (lb.closest("[data-reka-popper-content-wrapper] > *") || lb.parentElement);
  return { trig: t && { text: t.textContent.trim(), fv: t.matches(":focus-visible"), shadow: c.boxShadow.slice(0, 60) }, channel: (document.querySelector('[aria-label="Select animation"]') || {}).textContent?.trim(),
    tabpanel: [...document.querySelectorAll("[role=tabpanel]")].filter(e => e.getBoundingClientRect().width > 0).map(e => e.textContent.trim().replace(/\s+/g, " ").slice(0, 40)),
    options: [...document.querySelectorAll("[role=option]")].map(o => o.textContent.trim() + (o.getAttribute("aria-selected") === "true" ? "*" : "")),
    content: content && { cls: String(content.className).slice(0, 300), radius: getComputedStyle(content).borderTopLeftRadius, shadow: getComputedStyle(content).boxShadow.slice(0, 160) },
    rowCls: document.querySelector("[role=option]")?.className.slice(0, 200), active: document.activeElement?.getAttribute("aria-label") || document.activeElement?.tagName }; });
const S = async (page, name, note) => { const p = `${name}-1440-light.png`; await page.screenshot({ path: OUT + p }); log.steps.push({ frame: p, note, ...(await info(page)) }); };
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
await ctx.addInitScript(() => { try { localStorage.setItem("vueuse-color-scheme", "light"); } catch {} });
const page = await ctx.newPage(); const errs = []; page.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));
await page.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" }); await page.waitForTimeout(3500);
const docks = page.locator(".glass-dock");
const hoverDock = async (i) => { const b = await docks.nth(i).boundingBox(); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1100); };
const bottomIdx = async () => { const n = await docks.count(); let best = 0, by = -1; for (let i = 0; i < n; i++) { const b = await docks.nth(i).boundingBox(); if (b && b.y > by) { by = b.y; best = i; } } return best; };
const pickChannel = async (name) => { const bi = await bottomIdx(); await hoverDock(bi); await page.getByLabel("Select animation").first().click({ timeout: 8000 }); await page.waitForTimeout(700); await page.getByRole("option", { name }).first().click(); await page.waitForTimeout(1400); };
const openTab = async () => { await hoverDock(0); await page.locator('[aria-label="Controls tab"]').first().click(); await page.waitForTimeout(800); };
try {
  await pickChannel("Matrix");
  await openTab(); await S(page, "20-matrix-open", "dock tab listbox with Matrix channel");
  await page.getByRole("option", { name: "Matrix Controls" }).first().click(); await page.waitForTimeout(1400);
  await hoverDock(0); await S(page, "21-matrix-controls-picked", "after pointer pick");
  await pickChannel("Rotations");
  await hoverDock(0); await S(page, "22-back-to-rotations", "channel back to Rotations with matrix-controls selected");
  await openTab(); await S(page, "23-back-to-rotations-open", "reopen tab list");
  await page.keyboard.press("Escape"); await page.waitForTimeout(500);
  await pickChannel("Matrix");
  await hoverDock(0); await S(page, "24-matrix-again", "back to Matrix — does the pick restore?");
} catch (e) { log.err = String(e).slice(0, 300); }
log.errs = errs; await ctx.close();
// keyboard reach
const k = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
const kp = await k.newPage(); await kp.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" }); await kp.waitForTimeout(3500);
const order = [];
for (let i = 0; i < 10; i++) { await kp.keyboard.press("Tab"); await kp.waitForTimeout(400); const a = await kp.evaluate(() => document.activeElement?.getAttribute("aria-label") || document.activeElement?.tagName); order.push(a); if (a === "Controls tab") break; }
log.tabOrder = order;
await kp.waitForTimeout(600); { const p = "25-kbd-focus-trigger-1440-light.png"; await kp.screenshot({ path: OUT + p }); log.steps.push({ frame: p, ...(await info(kp)) }); }
await kp.keyboard.press("Enter"); await kp.waitForTimeout(800); { const p = "26-kbd-open-1440-light.png"; await kp.screenshot({ path: OUT + p }); log.steps.push({ frame: p, ...(await info(kp)) }); }
await kp.keyboard.press("ArrowDown"); await kp.waitForTimeout(300); await kp.keyboard.press("Enter"); await kp.waitForTimeout(1300); { const p = "27-kbd-picked-1440-light.png"; await kp.screenshot({ path: OUT + p }); log.steps.push({ frame: p, ...(await info(kp)) }); }
await k.close(); await browser.close();
writeFileSync(OUT + "probe-fallback-log.json", JSON.stringify(log, null, 2)); console.log(JSON.stringify(log, null, 1));

// Re-sample semantics probe — READ-ONLY on the app. Reads the inline editor's stops before/after preset change + re-sample, and after a retime.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process"; import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const TREE = "/Users/mkbabb/Programming/keyframes.js";
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const page = await ctx.newPage(); const errs = []; page.on("pageerror", e => errs.push(String(e).slice(0, 200))); page.on("console", m => { if (m.type() === "error") errs.push(m.text().slice(0, 200)); });
await page.goto("http://localhost:5173/#/spring", { waitUntil: "networkidle" }); await page.waitForTimeout(3500);
const read = () => page.evaluate(() => { const sec = document.querySelector(".keyframes-section"); return [...sec.querySelectorAll("[aria-label^='Keyframe at']")].map(c => (c.querySelector("input[aria-label=Offset]")?.value) + " :: " + (c.querySelector("[aria-label='CSS declarations']")?.textContent.trim().replace(/\s+/g, " "))); });
const out = { sha: execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim(), dirty: execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length };
out.initial_smooth = await read();
await page.locator(".preset-cell", { hasText: "bouncy" }).first().click(); await page.waitForTimeout(800);
out.after_bouncy_no_resample = await read();
await page.locator(".reseed-btn").first().click(); await page.waitForTimeout(800);
out.after_bouncy_resample = await read();
const fs = page.locator(".keyframes-section [role=slider]").nth(1); await fs.focus(); for (let i = 0; i < 50; i++) await page.keyboard.press("ArrowRight"); await page.waitForTimeout(600);
out.after_retime_50_arrows = await read();
await page.locator(".reseed-btn").first().click(); await page.waitForTimeout(800);
out.after_retime_then_resample = await read();
// PageUp / Shift+Arrow step size
await fs.focus(); await page.keyboard.press("PageUp"); await page.waitForTimeout(400); out.after_pageup = (await read())[1];
// remove a stop then resample
await page.getByRole("button", { name: "Remove the keyframe at 50%" }).first().click().catch(e => out.removeErr = String(e).slice(0, 120)); await page.waitForTimeout(600);
out.after_remove50 = await read();
await page.locator(".reseed-btn").first().click(); await page.waitForTimeout(800);
out.after_remove_then_resample = await read();
// Keyframes tab monaco text vs inline
await page.mouse.move(720, 70); await page.waitForTimeout(800);
await page.getByRole("combobox", { name: "Controls tab" }).click(); await page.waitForTimeout(500); await page.getByRole("option", { name: "Keyframes" }).click(); await page.waitForTimeout(2000);
out.monaco = await page.evaluate(() => [...document.querySelectorAll(".monaco-pane .view-line")].map(e => e.textContent).join("\n").slice(0, 900));
out.errs = errs; writeFileSync(OUT + "resample-probe.json", JSON.stringify(out, null, 1)); console.log(JSON.stringify(out, null, 1));
await b.close();

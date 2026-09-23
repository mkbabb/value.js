// Retime / re-sample / remove integrity probe (settled reads, 2s waits) — READ-ONLY on the app.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process"; import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const TREE = "/Users/mkbabb/Programming/keyframes.js";
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const page = await ctx.newPage(); const errs = []; page.on("pageerror", e => errs.push(String(e).slice(0, 200))); page.on("console", m => { if (m.type() === "error") errs.push(m.text().slice(0, 240)); });
await page.goto("http://localhost:5173/#/spring", { waitUntil: "networkidle" }); await page.waitForTimeout(3500);
const read = () => page.evaluate(() => { const sec = document.querySelector(".keyframes-section"); return [...sec.querySelectorAll("[aria-label^='Keyframe at']")].map(c => (c.querySelector("input[aria-label=Offset]")?.value) + " :: " + (c.querySelector("[aria-label='CSS declarations']")?.textContent.trim().replace(/\s+/g, " "))); });
const thumbs = () => page.evaluate(() => [...document.querySelector(".keyframes-section").querySelectorAll("[role=slider]")].map(t => t.getAttribute("aria-valuenow") + "@" + Math.round(t.getBoundingClientRect().width) + "w"));
const out = { sha: execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim(), dirty: execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length, steps: [] };
const log = async (label) => { await page.waitForTimeout(2000); out.steps.push({ label, cards: await read(), thumbs: await thumbs(), active: await page.evaluate(() => document.activeElement?.getAttribute("aria-label") || document.activeElement?.tagName) }); };
await log("initial");
const fs = page.locator(".keyframes-section [role=slider]").nth(1);
await fs.focus(); await page.keyboard.press("ArrowRight"); await log("thumb2 ArrowRight x1");
await page.keyboard.press("ArrowRight"); await log("ArrowRight x2 (focus retained?)");
await page.locator(".reseed-btn").first().click(); await log("re-sample");
await reveal(); async function reveal() { await page.evaluate(() => document.querySelector(".keyframes-section")?.scrollIntoView({ block: "start" })); }
await page.screenshot({ path: OUT + "12a-after-retime-resample-1440-light.png" });
await page.getByRole("button", { name: /Remove the keyframe at 50/ }).first().click(); await log("remove 50%");
await page.locator(".reseed-btn").first().click(); await log("re-sample after remove");
await page.screenshot({ path: OUT + "12b-after-remove-resample-1440-light.png" });
out.errs = errs; writeFileSync(OUT + "retime-probe.json", JSON.stringify(out, null, 1)); console.log(JSON.stringify(out, null, 1));
await b.close();

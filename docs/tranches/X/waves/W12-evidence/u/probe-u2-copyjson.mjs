// SERVED MODEL: claude-opus-5-5 — X.W12.u2: atmosphere Copy JSON confirms itself (UIA-V-391 copy half).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const BASE = process.env.BASE ?? "http://localhost:9000";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: true });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, permissions: ["clipboard-read", "clipboard-write"] });
const p = await ctx.newPage();
await p.goto(`${BASE}/?color=%23abcdef#/atmosphere`, { waitUntil: "domcontentloaded", timeout: 120000 });
const btn = p.getByRole("button", { name: "Copy JSON" });
await btn.waitFor({ timeout: 60000 });
await p.evaluate(() => navigator.clipboard.writeText("SENTINEL"));
await btn.click(); await p.waitForTimeout(200);
const r = { copied: await p.getByRole("button", { name: "Copied" }).count(), clipIsJson: (() => 0)() };
const clip = await p.evaluate(() => navigator.clipboard.readText());
try { JSON.parse(clip); r.clipIsJson = true; } catch { r.clipIsJson = false; }
await p.screenshot({ path: `${OUT}u2-atmos-copied-1440.png` });
await p.waitForTimeout(1800);
r.reset = await p.getByRole("button", { name: "Copy JSON" }).count();
await b.close();
writeFileSync(`${OUT}probe-u2-copyjson${process.env.RUN ?? ""}.json`, JSON.stringify(r, null, 1));
console.log(JSON.stringify(r));

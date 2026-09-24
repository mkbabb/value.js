// SERVED MODEL: claude-opus-5-5
// UIA-KF-011 · the CSS editor's parse -> serialize round-trip: Copy the editor's CSS, make one benign edit
// (type a space at the end), wait for the debounced re-parse, Copy again; read animation-duration/-delay both times
// and the Controls pane's stored duration field. usage: node roundtrip.mjs <tag> [baseURL]
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const tag = process.argv[2] || "run"; const BASE = process.argv[3] || "http://localhost:5173/";
const OUT = new URL(`./${tag}/`, import.meta.url).pathname; fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, permissions: ["clipboard-read", "clipboard-write"] });
const p = await ctx.newPage(); const errs = []; p.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));
await p.goto(BASE + "#/cube"); await p.waitForTimeout(4500);
await p.mouse.move(720, 70); await p.waitForTimeout(700);
await p.locator("[data-dock-tether=top] button").filter({ hasText: /^\s*Keyframes\s*$/ }).first().click().catch(async () => p.locator("[data-dock-tether=top] [aria-label=Keyframes]").first().click()); await p.waitForTimeout(2500);
const pick = (s) => ({ duration: (s.match(/animation-duration:\s*([^;]+);/) || [])[1] ?? null, delay: (s.match(/animation-delay:\s*([^;]+);/) || [])[1] ?? null, timing: (s.match(/animation-timing-function:\s*([^;]+);/) || [])[1] ?? null });
const copy = async () => { await p.getByRole("button", { name: "Copy", exact: true }).first().click(); await p.waitForTimeout(500); return p.evaluate(() => navigator.clipboard.readText()); };
const a = await copy();
await p.screenshot({ path: OUT + "before-edit.png" });
const vl = await p.locator(".monaco-editor .view-lines").first().boundingBox();
await p.mouse.click(vl.x + 120, vl.y + 40); await p.keyboard.press("Meta+ArrowDown"); await p.keyboard.type(" ", { delay: 30 });
await p.waitForTimeout(2500);
const c = await copy();
await p.screenshot({ path: OUT + "after-edit.png" });
const res = { base: BASE, before: pick(a), after: pick(c), errs };
fs.writeFileSync(OUT + "roundtrip.json", JSON.stringify({ ...res, clipA: a, clipB: c }, null, 1)); console.log(JSON.stringify(res));
await b.close();

// Stack of the storage-blocked boot failure.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext();
await ctx.addInitScript(() => { Object.defineProperty(window, "localStorage", { get() { throw new DOMException("The operation is insecure.", "SecurityError"); } }); });
const page = await ctx.newPage();
page.on("pageerror", (e) => console.log("STACK", e.stack?.split("\n").slice(0, 6).join(" | ")));
for (const p of ["/", "/paper"]) { await page.goto("http://localhost:3100" + p, { waitUntil: "networkidle" }).catch(() => {}); await page.waitForTimeout(1200); }
await browser.close();

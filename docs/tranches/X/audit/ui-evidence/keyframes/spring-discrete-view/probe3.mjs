// dock state across the Reveal/Dismiss toggle in the Entry view (read-only).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const TREE = "/Users/mkbabb/Programming/keyframes.js";
const sha = execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim(), dirty = execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const b = await chromium.launch({ headless: false });
const out = { sha, dirty, steps: [] };
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/spring", { waitUntil: "networkidle" }); await page.waitForTimeout(3000);
const dock = () => page.evaluate(() => { const c = document.querySelector("[aria-label='Select animation']"); let e = c; const chain = []; for (let i = 0; i < 8 && e; i++) { const r = e.getBoundingClientRect(); chain.push(e.className.toString().split(" ").slice(0, 3).join(".") + "@" + [r.x, r.width].map(Math.round)); e = e.parentElement; } const btns = [...document.querySelectorAll("button[aria-label]")].filter(x => { const r = x.getBoundingClientRect(); return r.top > 700 && r.top < 860; }).map(x => x.getAttribute("aria-label") + " vis=" + !!x.offsetParent + " op=" + getComputedStyle(x).opacity); return { chain: chain.slice(0, 5), btns, state: document.querySelector("[data-machine-status], [data-status]")?.getAttribute("data-status") }; });
const step = async (n) => out.steps.push({ n, ...(await dock()) });
await step("sweep-rest");
await page.getByRole("combobox", { name: "Select animation" }).first().click(); await page.waitForTimeout(400);
await page.getByRole("option", { name: /Entry/ }).first().click(); await page.mouse.move(1430, 450); await page.waitForTimeout(1500);
await step("entry-rest");
await page.locator("[aria-controls].btn-playback-accent").first().click(); await page.mouse.move(1430, 450);
for (const t of [100, 600, 2000, 4000]) { await page.waitForTimeout(t === 100 ? 100 : t - (t === 600 ? 100 : t === 2000 ? 600 : 2000)); await step("after-dismiss-" + t + "ms"); }
await page.screenshot({ path: OUT + "33a-dock-after-dismiss-4s-1440-light.png" });
const orb = await page.evaluate(() => { const c = document.querySelector("[aria-label='Select animation']"); const r = c.getBoundingClientRect(); return [r.x - 30, r.y + r.height / 2]; });
await page.mouse.move(orb[0], orb[1]); await page.waitForTimeout(1200); await step("hover-orb");
await page.screenshot({ path: OUT + "33b-dock-hover-orb-1440-light.png" });
writeFileSync(OUT + "probe3-log.json", JSON.stringify(out, null, 1));
await b.close();

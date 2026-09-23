// Pass 4: at home, pick "Matrix" / "Hover" from the transport list — does the choice survive the home->cube navigate?
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
const OUT = new URL(".", import.meta.url).pathname;
const TREE = "/Users/mkbabb/Programming/keyframes.js";
console.log("sha", execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim(), "dirty", execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length);
const browser = await chromium.launch({ headless: false });
for (const pick of ["Matrix", "Hover"]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
  const page = await ctx.newPage();
  await page.goto("http://localhost:5173/#/", { waitUntil: "networkidle" }); await page.waitForTimeout(3500);
  await page.getByLabel("Select animation").first().click(); await page.waitForTimeout(500);
  await page.getByRole("option", { name: pick }).click();
  const tl = [];
  for (const t of [300, 1500, 3500]) { await page.waitForTimeout(t - (tl.at(-1)?.t || 0)); tl.push({ t, ...(await page.evaluate(() => ({ url: location.hash, hero: !!document.querySelector(".hero-band"), sel: (document.querySelector('[aria-label="Select animation"]') || {}).textContent?.trim(), play: [...document.querySelectorAll("button")].map(b => b.getAttribute("aria-label")).filter(l => /Play|Pause/.test(l || "")) }))) }); }
  await page.screenshot({ path: OUT + `14-home-pick-${pick}-1440-light.png` });
  console.log(pick, JSON.stringify(tl));
  await ctx.close();
}
await browser.close();

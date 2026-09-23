import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
const OUT = new URL(".", import.meta.url).pathname;
const tree = () => execSync(`git -C /Users/mkbabb/Programming/keyframes.js rev-parse --short HEAD`).toString().trim() + " dirty=" + execSync(`git -C /Users/mkbabb/Programming/keyframes.js status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const b = await chromium.launch({ headless: false });
for (const theme of ["dark", "light"]) {
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme });
await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
const page = await ctx.newPage(); const errs = []; let navs = 0;
page.on("pageerror", e => errs.push("pageerror " + String(e).slice(0, 300)));
page.on("console", m => { if (m.type() === "error" || /vite|hmr/i.test(m.text())) errs.push(m.type() + " " + m.text().slice(0, 200)); });
page.on("framenavigated", f => { if (f === page.mainFrame()) navs++; });
await page.goto(`http://localhost:5173/#/spring`, { waitUntil: "networkidle" }); await page.waitForTimeout(3000);
const res = [];
for (const tab of ["Keyframes", "Controls", "Timeline", "Physics"]) {
  const d = await page.locator(".glass-dock").first().boundingBox().catch(() => null);
  if (!d) { res.push(tab + ": no dock"); continue; }
  await page.mouse.move(d.x + d.width / 2, d.y + d.height / 2); await page.waitForTimeout(1100);
  await page.getByRole("combobox", { name: "Controls tab" }).first().click({ timeout: 4000 }).catch(e => res.push("cbx " + String(e).slice(0, 60)));
  await page.waitForTimeout(600);
  await page.getByRole("option", { name: tab, exact: true }).first().click({ timeout: 4000 }).catch(e => res.push("opt " + String(e).slice(0, 60)));
  await page.waitForTimeout(1500); await page.mouse.move(1430, 450); await page.waitForTimeout(500);
  res.push(tab + ": appChildren=" + await page.evaluate(() => document.querySelector("#app")?.children.length + " text=" + document.body.innerText.length + " stage=" + !!document.querySelector(".spring-target")));
  await page.screenshot({ path: OUT + `16-tabcycle-${tab.toLowerCase()}-1440-${theme}.png` });
}
console.log(theme, tree(), "navs=" + navs, JSON.stringify(res), JSON.stringify(errs));
await ctx.close();
}
await b.close();

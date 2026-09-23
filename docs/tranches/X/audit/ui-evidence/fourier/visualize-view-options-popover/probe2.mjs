// Probe: keyboard reach into the hover popover (desktop) + mobile expanded-dock overflow and popover/trigger detachment. READ-ONLY.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { readFileSync, writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const slug = readFileSync(OUT + "seed.txt", "utf8").trim();
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
const res = {};
{ const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto(`http://localhost:3100/w/${slug}`, { waitUntil: "networkidle" }); await page.waitForTimeout(2000);
  // keyboard-only: Tab from body until the collapsed dock's "Expand dock" is focused
  const seq = [];
  for (let i = 0; i < 25; i++) { await page.keyboard.press("Tab"); const a = await page.evaluate(() => document.activeElement?.getAttribute("aria-label") || document.activeElement?.textContent.trim().slice(0, 20)); seq.push(a); if (a === "Expand dock") break; }
  await page.keyboard.press("Enter"); await page.waitForTimeout(700);
  const afterExpand = []; 
  for (let i = 0; i < 8; i++) { const st = await page.evaluate(() => ({ a: document.activeElement?.getAttribute("aria-label"), pop: !!document.querySelector("[aria-label='Image overlay']") })); afterExpand.push(st); if (st.a === "View options") { await page.keyboard.press("Enter"); await page.waitForTimeout(600); afterExpand.push({ enterOnEye: await page.evaluate(() => !!document.querySelector("[aria-label='Image overlay']")) }); await page.screenshot({ path: OUT + "d-light-8-keyboard-eye-enter.png" }); for (let j = 0; j < 3; j++) { await page.keyboard.press("Tab"); await page.waitForTimeout(250); afterExpand.push(await page.evaluate(() => ({ tabTo: document.activeElement?.getAttribute("aria-label"), pop: !!document.querySelector("[aria-label='Image overlay']") }))); } break; } await page.keyboard.press("Tab"); await page.waitForTimeout(200); }
  res.keyboard = { seq, afterExpand };
  await ctx.close(); }
{ const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true });
  const page = await ctx.newPage();
  await page.goto(`http://localhost:3100/w/${slug}`, { waitUntil: "networkidle" }); await page.waitForTimeout(2000);
  await page.getByRole("tab", { name: /^canvas$/i }).or(page.getByRole("button", { name: /^canvas$/i })).first().click(); await page.waitForTimeout(600);
  await page.locator(".controls-dock-anchor [aria-label='Expand dock']").first().tap(); await page.waitForTimeout(900);
  res.mobileDock = await page.evaluate(() => { const d = document.querySelector(".controls-dock-anchor .glass-dock"); const sc = [d, ...d.querySelectorAll("*")].filter((e) => e.scrollWidth > e.clientWidth + 2 && getComputedStyle(e).overflowX !== "visible").map((e) => ({ cls: e.className.toString().slice(0, 60), sw: e.scrollWidth, cw: e.clientWidth, ox: getComputedStyle(e).overflowX }));
    const vis = [...d.querySelectorAll("button[aria-label]")].map((b) => { const r = b.getBoundingClientRect(); return [b.getAttribute("aria-label"), Math.round(r.x), Math.round(r.width), getComputedStyle(b).visibility]; }); const r = d.getBoundingClientRect(); return { dock: [r.x, r.width], scrollers: sc, buttons: vis }; });
  await page.screenshot({ path: OUT + "m-light-9-expanded-dock.png" });
  await page.locator("[aria-label='View options']").tap(); await page.waitForTimeout(700);
  const snap = async (tag) => page.evaluate((tag) => { const e = document.querySelector("[aria-label='View options']").getBoundingClientRect(); const p = document.querySelector("[aria-label='Image overlay']")?.closest(".glass-floating")?.getBoundingClientRect(); const d = document.querySelector(".controls-dock-anchor .glass-dock"); return { tag, eye: [Math.round(e.x), Math.round(e.y)], pop: p && [Math.round(p.x), Math.round(p.y), Math.round(p.width), Math.round(p.height)], dockExpanded: d.classList.contains("expanded") }; }, tag);
  res.detach = [await snap("open")];
  await page.waitForTimeout(3000); res.detach.push(await snap("open+3s idle"));
  await page.locator("[aria-label='Contour trace']").tap(); await page.waitForTimeout(800); res.detach.push(await snap("after tap trace"));
  await page.screenshot({ path: OUT + "m-light-10-after-tap-detached.png" });
  await page.waitForTimeout(3000); res.detach.push(await snap("after tap +3s"));
  await page.locator("[aria-label='Contour trace']").tap(); await page.waitForTimeout(800); res.detach.push(await snap("after 2nd tap"));
  await ctx.close(); }
writeFileSync(OUT + "probe2.json", JSON.stringify(res, null, 1)); console.log(JSON.stringify(res, null, 1)); await browser.close();

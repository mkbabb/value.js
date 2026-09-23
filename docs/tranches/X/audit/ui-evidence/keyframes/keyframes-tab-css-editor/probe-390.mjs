// probe-390 — READ-ONLY: can the ribbon be reached at 390 (drawer snaps + scroll)? light+dark.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process"; import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const TREE = "/Users/mkbabb/Programming/keyframes.js";
const rev = () => execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim() + "+" + execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const browser = await chromium.launch({ headless: false }); const res = { kf: rev(), runs: [] };
for (const theme of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: theme, hasTouch: false, permissions: ["clipboard-read", "clipboard-write"] });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage(); const run = { theme, steps: [] };
  await page.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" }); await page.waitForTimeout(3500);
  const b = await page.locator(".glass-dock").first().boundingBox(); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1100);
  await page.locator('[aria-label="Controls tab"]').first().click(); await page.waitForTimeout(700);
  await page.getByRole("option", { name: /^Keyframes/ }).first().click(); await page.waitForTimeout(2200); await page.mouse.move(5, 300); await page.waitForTimeout(500);
  const geo = (label) => page.evaluate((label) => { const vis = e => e && e.getBoundingClientRect().height > 0; const r = e => { const b = e.getBoundingClientRect(); return [b.x, b.y, b.width, b.height].map(Math.round); };
    const cp = [...document.querySelectorAll("button")].find(x => x.textContent.trim() === "Copy" && vis(x));
    const dr = document.querySelector(".glass-drawer, [data-vaul-drawer], [role=dialog]");
    const scs = [...document.querySelectorAll("*")].filter(e => { const c = getComputedStyle(e); return /(auto|scroll)/.test(c.overflowY) && e.scrollHeight > e.clientHeight + 4 && vis(e) && e.getBoundingClientRect().y < innerHeight; }).map(e => ({ cls: (e.className?.baseVal ?? e.className).toString().slice(0, 70), sh: e.scrollHeight, ch: e.clientHeight, st: e.scrollTop, box: r(e) }));
    const tp = [...document.querySelectorAll("button, [role=button]")].filter(vis).find(x => /Rotations/.test(x.textContent)); 
    return { label, copy: cp ? r(cp) : null, drawer: dr ? { box: r(dr), snap: dr.getAttribute("data-snap") || dr.getAttribute("data-state") } : null, scrollers: scs.slice(0, 6), transport: tp ? r(tp) : null }; }, label);
  run.steps.push(await geo("after-select"));
  const t = page.getByRole("button", { name: "Controls panel" }).first(); run.hasControlsPanelBtn = await t.count();
  const h = page.locator(".glass-drawer-handle").first(); let hb = await h.boundingBox().catch(() => null); run.handle = hb;
  if (hb) { await page.mouse.move(hb.x + hb.width / 2, hb.y + hb.height / 2); await page.mouse.down(); await page.mouse.move(hb.x + hb.width / 2, 10, { steps: 15 }); await page.mouse.up(); await page.waitForTimeout(1500); }
  run.steps.push(await geo("after-drag-full")); await page.screenshot({ path: OUT + `17-drawer-full-390-${theme}.png` });
  const ed = await page.locator(".monaco-pane .monaco-editor").filter({ visible: true }).first().boundingBox().catch(() => null);
  // wheel outside the editor (on the drawer body margin) then over the editor
  await page.mouse.move(12, 600); await page.mouse.wheel(0, 800); await page.waitForTimeout(800); run.steps.push(await geo("wheel-margin"));
  if (ed) { await page.mouse.move(ed.x + ed.width / 2, ed.y + 100); await page.mouse.wheel(0, 3000); await page.waitForTimeout(800); run.steps.push(await geo("wheel-editor")); }
  await page.screenshot({ path: OUT + `18-after-scroll-390-${theme}.png` });
  const cp = page.getByRole("button", { name: "Copy", exact: true }).filter({ visible: true }).first(); await cp.scrollIntoViewIfNeeded({ timeout: 3000 }).catch(e => run.scrollIntoView = String(e).slice(0, 120)); await page.waitForTimeout(600);
  run.steps.push(await geo("scrollIntoView")); await page.screenshot({ path: OUT + `19-ribbon-attempt-390-${theme}.png` });
  res.runs.push(run); await ctx.close();
}
await browser.close(); writeFileSync(OUT + "probe-390-log.json", JSON.stringify(res, null, 2)); console.log(JSON.stringify(res, null, 0).slice(0, 4000));

// INSTRUMENTED probe — READ-ONLY on the app tree. Injects vue-sonner's OWN shipped stylesheet
// (node_modules/vue-sonner/lib/index.css, the file the demo never imports) into the live page via
// addStyleTag so the designed toast can be judged in the viewport. Frames are prefixed "sim-".
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process"; import { readFileSync, writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const TREE = "/Users/mkbabb/Programming/keyframes.js";
const CSS = readFileSync(TREE + "/node_modules/vue-sonner/lib/index.css", "utf8");
const tree = execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim() + "+" + execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length + "dirty";
const VPS = { "1440": { width: 1440, height: 900 }, "390": { width: 390, height: 844 } };
const out = { tree, runs: [] };
const b = await chromium.launch({ headless: false });
const m = (page) => page.evaluate(() => { const d = document.querySelector(".glass-dock")?.getBoundingClientRect(); return [...document.querySelectorAll("[data-sonner-toast]")].map(t => { const r = t.getBoundingClientRect(), c = getComputedStyle(t); const ov = d && !(r.right < d.left || r.left > d.right || r.bottom < d.top || r.top > d.bottom); return { type: t.getAttribute("data-type"), text: t.textContent.trim().slice(0, 60), rect: [r.x, r.y, r.width, r.height].map(Math.round), radius: c.borderTopLeftRadius, bg: c.backgroundColor, fg: c.color, backdrop: c.backdropFilter, iconColor: t.querySelector("[data-icon] svg") ? getComputedStyle(t.querySelector("[data-icon] svg")).color : null, overlapsDock: ov, inViewport: r.top >= 0 && r.bottom <= innerHeight }; }); });
for (const vp of ["1440", "390"]) for (const theme of ["light", "dark"]) {
  const tag = `${vp}-${theme}`; const run = { tag, frames: [] };
  const ctx = await b.newContext({ viewport: VPS[vp], deviceScaleFactor: 2, colorScheme: theme, permissions: ["clipboard-read", "clipboard-write"] });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage(); await page.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" }); await page.waitForTimeout(3000);
  await page.addStyleTag({ content: CSS });
  const hover = async () => { const d = await page.locator(".glass-dock").first().boundingBox(); await page.mouse.move(d.x + d.width / 2, d.y + d.height / 2); await page.waitForTimeout(1100); };
  const openShare = async () => { await page.keyboard.press("Escape"); await page.mouse.move(VPS[vp].width / 2, VPS[vp].height / 2); await page.waitForTimeout(1500); await hover(); await page.getByRole("button", { name: "@mbabb menu" }).first().click(); await page.waitForTimeout(800); await page.locator("[aria-label='Share animation']").first().click(); await page.waitForTimeout(900); };
  const shot = async (name) => { const p = `sim-${name}-${tag}.png`; await page.screenshot({ path: OUT + p }); const ts = await m(page); run.frames.push({ frame: p, toasts: ts });
    const bx = await page.locator("[data-sonner-toast]").evaluateAll(els => els.map(e => e.getBoundingClientRect()).filter(r => r.width > 0).map(r => ({ x: r.x, y: r.y, r: r.right, b: r.bottom })));
    if (bx.length) { const vpS = page.viewportSize(); const x = Math.max(0, Math.min(...bx.map(q => q.x)) - 24), y = Math.max(0, Math.min(...bx.map(q => q.y)) - 24); const w = Math.min(vpS.width, Math.max(...bx.map(q => q.r)) + 24) - x, h = Math.min(vpS.height, Math.max(...bx.map(q => q.b)) + 24) - y; if (w > 0 && h > 0) await page.screenshot({ path: OUT + `sim-${name}-${tag}-crop.png`, clip: { x, y, width: w, height: h } }); } };
  // success: share copy link
  await openShare(); await page.locator("[role=dialog] button[title='Copy share link']").first().click(); await page.waitForTimeout(800); await page.mouse.move(VPS[vp].width / 2, 5); await shot("01-success-link-copied");
  await page.waitForTimeout(4500);
  // error + stacked: two bad loads + restore success
  await openShare(); const f = page.getByLabel("Share URL or hash to load").first();
  await f.fill("@@bad@@"); await page.keyboard.press("Enter"); await page.waitForTimeout(600); await shot("02-error-invalid");
  await f.fill("http://localhost:5173/#/cube"); await page.keyboard.press("Enter"); await page.waitForTimeout(600);
  const clip = await page.evaluate(() => navigator.clipboard.readText()); await f.fill(clip); await page.keyboard.press("Enter"); await page.waitForTimeout(900);
  await page.mouse.move(VPS[vp].width / 2, 5); await shot("03-stacked-collapsed");
  const t0 = await page.locator("[data-sonner-toast]").first().boundingBox(); if (t0) { await page.mouse.move(t0.x + t0.width / 2, t0.y + t0.height / 2); await page.waitForTimeout(700); await shot("04-stacked-expanded"); }
  await ctx.close();
  // info: clipboard refused
  const ctx2 = await b.newContext({ viewport: VPS[vp], deviceScaleFactor: 2, colorScheme: theme });
  await ctx2.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} ; try { Object.defineProperty(navigator.clipboard, "writeText", { value: () => Promise.reject(new Error("denied")) }); } catch {} }, theme);
  const p2 = await ctx2.newPage(); await p2.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" }); await p2.waitForTimeout(3000); await p2.addStyleTag({ content: CSS });
  const d2 = await p2.locator(".glass-dock").first().boundingBox(); await p2.mouse.move(d2.x + d2.width / 2, d2.y + d2.height / 2); await p2.waitForTimeout(1100);
  await p2.getByRole("button", { name: "@mbabb menu" }).first().click(); await p2.waitForTimeout(800); await p2.locator("[aria-label='Share animation']").first().click(); await p2.waitForTimeout(900);
  await p2.locator("[role=dialog] button[title='Copy share link']").first().click(); await p2.waitForTimeout(900); await p2.mouse.move(VPS[vp].width / 2, 5);
  { const pth = `sim-05-info-${tag}.png`; await p2.screenshot({ path: OUT + pth }); run.frames.push({ frame: pth, toasts: await m(p2) }); }
  await ctx2.close();
  out.runs.push(run);
}
writeFileSync(OUT + "probe-with-sonner-css.json", JSON.stringify(out, null, 1));
for (const r of out.runs) { console.log(r.tag); for (const f of r.frames) console.log(" ", f.frame, f.toasts.map(t => `${t.type}:${t.text}@${t.rect} r${t.radius} bg${t.bg} icon${t.iconColor} dock${t.overlapsDock} inVP${t.inViewport}`).join(" | ").slice(0, 400)); }
await b.close();

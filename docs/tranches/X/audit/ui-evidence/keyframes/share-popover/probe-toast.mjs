// toast visibility probe — READ-ONLY; samples the sonner toast rect over time after Copy and after Restore.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const vp = process.argv[2] || "1440", theme = process.argv[3] || "light";
const VP = vp === "1440" ? { width: 1440, height: 900 } : { width: 390, height: 844 };
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: VP, deviceScaleFactor: 2, colorScheme: theme, permissions: ["clipboard-read", "clipboard-write"] });
await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
const page = await ctx.newPage();
const out = { vp, theme, samples: {} };
const sample = () => page.evaluate(() => {
  const tl = document.querySelector("[data-sonner-toaster]"); const ol = tl && tl.closest("ol,section");
  const r = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); const c = getComputedStyle(e); return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height), c.opacity, c.transform.slice(0, 40), c.position]; };
  return { toaster: r(tl), parent: tl ? tl.parentElement.tagName : null, toasts: [...document.querySelectorAll("[data-sonner-toast]")].map(t => ({ t: t.textContent.trim().slice(0, 40), r: r(t), mounted: t.getAttribute("data-mounted"), removed: t.getAttribute("data-removed") })) };
});
const hover = async () => { const b = await page.locator(".glass-dock").first().boundingBox(); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1100); };
const openShare = async () => { await hover(); await page.getByRole("button", { name: "@mbabb menu" }).first().click(); await page.waitForTimeout(800); await page.locator("[aria-label='Share animation']").first().click(); await page.waitForTimeout(900); };
async function series(key, n = 12, dt = 250) { out.samples[key] = []; for (let i = 0; i < n; i++) { const s = await sample(); out.samples[key].push({ t: i * dt, ...s }); if (i === 3) await page.screenshot({ path: OUT + `${key}-${vp}-${theme}.png` }); await page.waitForTimeout(dt); } }
await page.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" }); await page.mouse.move(VP.width / 2, VP.height - 10); await page.waitForTimeout(3500);
await openShare();
await page.locator("[role=dialog] button[title='Copy share link']").first().click();
await series("P1-copy-toast");
const clip = await page.evaluate(() => navigator.clipboard.readText());
await page.keyboard.press("Escape"); await page.waitForTimeout(500);
await page.goto("http://localhost:5173/#/amiga"); await page.waitForTimeout(2500);
await openShare(); await page.getByLabel("Share URL or hash to load").first().fill(clip); await page.keyboard.press("Enter");
await series("P2-restore-toast");
out.hashAfter = await page.evaluate(() => location.hash.slice(0, 60));
// same-scene restore (no scene switch) — does the toast appear then?
await page.keyboard.press("Escape"); await page.waitForTimeout(500);
await openShare(); await page.getByLabel("Share URL or hash to load").first().fill(clip); await page.keyboard.press("Enter");
await series("P3-restore-same-scene-toast");
// errors
await page.keyboard.press("Escape"); await page.waitForTimeout(500);
await openShare(); await page.getByLabel("Share URL or hash to load").first().fill("http://localhost:5173/#/cube"); await page.keyboard.press("Enter");
await series("P4-error-nostate-toast", 6);
out.p4open = await page.locator("[role=dialog]:has(input[aria-label='Share URL or hash to load'])").count();
await page.getByLabel("Share URL or hash to load").first().fill("@@not-base64@@"); await page.keyboard.press("Enter");
await series("P5-error-invalid-toast", 6);
out.p5inputInvalid = await page.getByLabel("Share URL or hash to load").first().getAttribute("aria-invalid");
await page.getByLabel("Share URL or hash to load").first().fill("MTIz"); await page.keyboard.press("Enter");
await series("P6-probe-nonstate-json", 6);
out.p6open = await page.locator("[role=dialog]:has(input[aria-label='Share URL or hash to load'])").count();
writeFileSync(OUT + `probe-toast-${vp}-${theme}.json`, JSON.stringify(out, null, 1));
await browser.close();
console.log(JSON.stringify(Object.fromEntries(Object.entries(out.samples).map(([k, v]) => [k, v.map(s => s.toasts.map(t => t.t + "@" + (t.r || []).slice(0, 2).join(",") + " op" + (t.r || [])[4]).join("|")).join(" ; ")]))), out.hashAfter, out.p4open, out.p5inputInvalid, out.p6open);

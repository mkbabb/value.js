// probe390 — READ-ONLY: can the 390 drawer reach the ribbon's Play? what intercepts it?
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: "light" });
const p = await ctx.newPage(); await p.goto("http://localhost:5173/#/easing", { waitUntil: "networkidle" }); await p.waitForTimeout(3500);
const errs=[]; p.on("pageerror", e => errs.push(String(e).slice(0,200))); await p.screenshot({ path: OUT + "P0-390-boot-390-light.png" }); console.log("names", JSON.stringify(await p.evaluate(() => [...document.querySelectorAll("button")].map(b => b.getAttribute("aria-label")).filter(Boolean).slice(0, 8)))); { const top = p.locator(".glass-dock").first(); const bb = await top.boundingBox(); if (bb) { await p.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await p.waitForTimeout(900); } } await p.getByRole("button", { name: "Controls panel" }).first().click({ timeout: 8000 }); await p.waitForTimeout(1500);
const info = async (tag) => { const o = await p.evaluate(() => { const pl = document.querySelector("button.btn-playback-accent"); const r = pl.getBoundingClientRect(); const hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
  const scrollers = [...document.querySelectorAll("*")].filter(x => x.scrollHeight > x.clientHeight + 4 && /auto|scroll/.test(getComputedStyle(x).overflowY)).map(x => x.className.toString().slice(0, 60) + " sh=" + x.scrollHeight + " ch=" + x.clientHeight + " st=" + x.scrollTop);
  const sheet = pl.closest("[data-slot=sheet], [role=dialog], .sheet, [class*=sheet]");
  return { play: [r.x, r.y, r.width, r.height].map(Math.round), hit: hit ? hit.tagName + "." + hit.className.toString().slice(0, 80) + " aria=" + hit.getAttribute("aria-label") : null, inPlay: pl.contains(hit), scrollers, sheet: sheet ? sheet.className.toString().slice(0, 80) + " " + JSON.stringify(sheet.getBoundingClientRect()) : null, vh: innerHeight }; }); console.log(tag, JSON.stringify(o)); };
await info("peek");
// try: drag the sheet handle up to expand
const handle = await p.evaluate(() => { const h = [...document.querySelectorAll("[class*=handle], [data-slot*=handle], [aria-label*=esize], [aria-label*=rag]")].find(e => e.getBoundingClientRect().width > 20); if (!h) return null; const r = h.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2, cls: h.className.toString().slice(0, 60), aria: h.getAttribute("aria-label") }; });
console.log("handle", JSON.stringify(handle));
if (handle) { await p.mouse.move(handle.x, handle.y); await p.mouse.down(); await p.mouse.move(handle.x, 80, { steps: 12 }); await p.mouse.up(); await p.waitForTimeout(1200); await info("after-handle-drag"); await p.screenshot({ path: OUT + "P1-390-after-handle-drag-390-light.png" }); }
await p.mouse.move(195, 600); await p.mouse.wheel(0, 800); await p.waitForTimeout(900); await info("after-wheel"); await p.screenshot({ path: OUT + "P2-390-after-wheel-390-light.png" });
const hd = p.getByLabel("Drawer position").first(); console.log("handleRole", await hd.evaluate(e => e.tagName + " role=" + e.getAttribute("role") + " vnow=" + e.getAttribute("aria-valuenow") + " vtext=" + e.getAttribute("aria-valuetext")));
await hd.focus(); for (const k of ["ArrowUp", "ArrowUp", "End"]) { await p.keyboard.press(k); await p.waitForTimeout(900); await info("key-" + k); }
console.log("handleAfter", await hd.evaluate(e => "vnow=" + e.getAttribute("aria-valuenow") + " vtext=" + e.getAttribute("aria-valuetext")));
await p.screenshot({ path: OUT + "P3-390-after-handle-keys-390-light.png" }); console.log("errs", JSON.stringify(errs));
await b.close();

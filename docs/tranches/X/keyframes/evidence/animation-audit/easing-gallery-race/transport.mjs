// transport wiring probe: scrubber, Reverse, dock Play — reads ball transforms.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.goto("http://localhost:5173/#/easing", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
const snap = (label) => page.evaluate((label) => ({ label,
  name: document.querySelector(".specimen-name")?.textContent.trim(),
  lin: document.querySelector('.tile-ball[data-curve="linear"]').style.transform,
  ei: document.querySelector('.tile-ball[data-curve="ease-in"]').style.transform,
  play: [...document.querySelectorAll("button.btn-playback")].map(b=>b.textContent.trim()).join("|"),
  ribbonBall: (()=>{ const r=[...document.querySelectorAll("[class*=visualizer] *, .animation-visualizer *")].find(e=>e.getBoundingClientRect().width>30&&e.getBoundingClientRect().width<60); return r? Math.round(r.getBoundingClientRect().x):null })(),
}), label);
const out = [];
out.push(await page.evaluate(() => [...document.querySelectorAll('[role="slider"]')].map(s => ({ l: s.getAttribute("aria-label"), p: s.closest("[aria-label]")?.getAttribute("aria-label"), v: s.getAttribute("aria-valuenow") }))));
out.push(await snap("load"));
// the ribbon scrubber thumb
const thumb = page.locator('[aria-label="Scrub animation timeline"] [role="slider"], [role="slider"][aria-label="Scrub animation timeline"]').first();
out.push({ thumbCount: await thumb.count() });
if (await thumb.count()) {
  await thumb.focus();
  for (let i = 0; i < 10; i++) await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(300);
  out.push(await snap("scrub 10xRight"));
  // pointer drag across the scrubber track
  const track = await page.locator('[aria-label="Scrub animation timeline"]').first().boundingBox();
  await page.mouse.move(track.x + 4, track.y + track.height/2);
  await page.mouse.down();
  for (let k = 0; k <= 10; k++) { await page.mouse.move(track.x + 4 + (track.width-8)*k/10, track.y + track.height/2); await page.waitForTimeout(40); }
  out.push(await snap("pointer-drag to end (held)"));
  await page.mouse.up();
  await page.waitForTimeout(200);
  out.push(await snap("pointer-drag released"));
}
// ribbon Play, then Reverse while playing
await page.locator("button.btn-playback", { hasText: "Play" }).first().click();
await page.waitForTimeout(400);
const seq = async (label) => { const a=[]; for (let i=0;i<6;i++){ a.push((await snap(label)).lin); await page.waitForTimeout(100);} return {label, lin:a}; };
out.push(await seq("playing"));
await page.locator("button.btn-playback", { hasText: "Reverse" }).first().click();
out.push(await seq("after Reverse"));
await page.locator("button.btn-playback", { hasText: "Reverse" }).first().click();
// pause with ribbon, then dock Play
await page.locator("button.btn-playback").first().click();
await page.waitForTimeout(200);
out.push(await seq("ribbon-paused"));
await page.locator('button[aria-label="Play animation"]:visible').first().click();
await page.waitForTimeout(200);
out.push(await seq("after dock Play"));
out.push(await snap("dock"));
await page.screenshot({ path: OUT + "07-transport.png" });
writeFileSync(OUT + "transport.json", JSON.stringify(out, null, 1));
console.log(JSON.stringify(out));
await browser.close();

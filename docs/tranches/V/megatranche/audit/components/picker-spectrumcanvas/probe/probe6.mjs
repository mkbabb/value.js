import { chromium } from "playwright";
const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/picker-spectrumcanvas/probe";
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errs = []; page.on("pageerror", e => errs.push(e.message));
await page.goto("http://localhost:9000/", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1500);

// ---- A: right-button pointerdown starts a drag & leaves isDragging stuck ----
const box = await page.locator(".spectrum-picker").boundingBox();
const label = () => page.locator(".spectrum-picker").getAttribute("aria-label");
console.log("A0 before:", await label());
await page.mouse.move(box.x + box.width * 0.15, box.y + box.height * 0.15);
await page.mouse.down({ button: "right" });
await page.waitForTimeout(150);
console.log("A1 after right-press at 15%/85%:", await label());
// no mouse.up — simulate the context-menu swallow; now move the mouse with NO button held
await page.mouse.up({ button: "right" });          // browser delivers pointerup
await page.waitForTimeout(150);
await page.mouse.move(box.x + box.width * 0.85, box.y + box.height * 0.85, { steps: 5 });
await page.waitForTimeout(300);
console.log("A2 after buttonless move to 85%/15%:", await label());

// ---- A': the harsher variant — right-press, then NO pointerup at all (menu swallows it) ----
await page.mouse.move(box.x + box.width * 0.2, box.y + box.height * 0.2);
const stuck = await page.evaluate(async () => {
  const el = document.querySelector(".spectrum-picker");
  const r = el.getBoundingClientRect();
  const mk = (type, x, y, buttons, button) => new PointerEvent(type, { bubbles: true, cancelable: true, composed: true, pointerId: 1, pointerType: "mouse", isPrimary: true, button, buttons, clientX: x, clientY: y });
  // right press, no release (context menu swallows the up)
  el.dispatchEvent(mk("pointerdown", r.left + r.width * 0.2, r.top + r.height * 0.2, 2, 2));
  await new Promise(res => requestAnimationFrame(res));
  const a = el.getAttribute("aria-label");
  // hover move, no buttons held
  el.dispatchEvent(mk("pointermove", r.left + r.width * 0.8, r.top + r.height * 0.8, 0, -1));
  await new Promise(res => requestAnimationFrame(res)); await new Promise(res => requestAnimationFrame(res));
  const b = el.getAttribute("aria-label");
  el.dispatchEvent(mk("pointermove", r.left + r.width * 0.35, r.top + r.height * 0.6, 0, -1));
  await new Promise(res => requestAnimationFrame(res)); await new Promise(res => requestAnimationFrame(res));
  const c = el.getAttribute("aria-label");
  return { afterRightPress: a, afterHover1: b, afterHover2: c };
});
console.log("A' stuck-drag:", JSON.stringify(stuck));

// ---- B: does the raw-coord wipe track the 300ms URL debounce? two picks 150ms apart ----
const b2 = await page.evaluate(async () => {
  const el = document.querySelector(".spectrum-picker");
  const r = el.getBoundingClientRect();
  const dot = el.querySelector(".spectrum-dot");
  const mk = (type, x, y) => new PointerEvent(type, { bubbles: true, cancelable: true, composed: true, pointerId: 1, pointerType: "mouse", isPrimary: true, button: 0, buttons: type === "pointerup" ? 0 : 1, clientX: x, clientY: y });
  const pick = (fx, fy) => { const x = r.left + r.width * fx, y = r.top + r.height * fy; el.dispatchEvent(mk("pointerdown", x, y)); el.dispatchEvent(mk("pointerup", x, y)); };
  const trail = []; const t0 = performance.now();
  pick(0.3, 0.3);
  await new Promise(res => setTimeout(res, 150));
  pick(0.32, 0.3);
  for (let i = 0; i < 10; i++) { await new Promise(res => setTimeout(res, 60)); trail.push({ t: Math.round(performance.now() - t0), left: dot.style.left, top: dot.style.top }); }
  return trail;
});
console.log("B two-pick trail (default space):", JSON.stringify(b2));

// ---- C: kelvin bottom-half collapse ----
await page.getByLabel("Select color space").first().click();
await page.waitForTimeout(400);
await page.getByRole("option", { name: /^Kelvin$/ }).first().click();
await page.waitForTimeout(900);
for (const fy of [0.5, 0.7, 0.9]) {
  await page.evaluate((fy) => {
    const el = document.querySelector(".spectrum-picker"); const r = el.getBoundingClientRect();
    const mk = (t, x, y) => new PointerEvent(t, { bubbles: true, cancelable: true, composed: true, pointerId: 1, pointerType: "mouse", isPrimary: true, button: 0, buttons: t === "pointerup" ? 0 : 1, clientX: x, clientY: y });
    const x = r.left + r.width * 0.5, y = r.top + r.height * fy;
    el.dispatchEvent(mk("pointerdown", x, y)); el.dispatchEvent(mk("pointerup", x, y));
  }, fy);
  await page.waitForTimeout(700);
  const rd = await page.evaluate(() => Array.from(document.querySelectorAll('[role="textbox"][aria-label$="component value"]')).filter(e=>e.offsetParent).map(e=>e.innerText.trim()));
  const dot = await page.evaluate(() => { const d = document.querySelector(".spectrum-dot"); return d.style.left + " / " + d.style.top; });
  console.log(`C kelvin pick at s=50% v=${((1-fy)*100).toFixed(0)}% -> readout ${JSON.stringify(rd)} dot ${dot} label "${await 0 || ''}"`);
}
await page.locator(".spectrum-picker").screenshot({ path: OUT + "/kelvin-plate-after-bottom-pick.png" });
console.log("ERRORS:", JSON.stringify(errs.slice(0,6)));
await browser.close();

import { chromium } from "playwright";
const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/picker-spectrumcanvas/probe";
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errs = [];
page.on("pageerror", (e) => errs.push("PAGEERROR: " + e.message));

const INIT = `
window.__dot = [];
window.__t0 = performance.now();
`;
await page.addInitScript(INIT);
await page.goto("http://localhost:9000/", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1500);

// ============ P1: dot-persistence after release (the URL round-trip wipe) ============
async function pickAndWatch(page, fx, fy, ms = 1400) {
  return await page.evaluate(async ([fx, fy, ms]) => {
    const el = document.querySelector(".spectrum-picker");
    const r = el.getBoundingClientRect();
    const mk = (type, x, y) => new PointerEvent(type, { bubbles: true, cancelable: true, composed: true, pointerId: 1, pointerType: "mouse", isPrimary: true, button: 0, buttons: type === "pointerup" ? 0 : 1, clientX: x, clientY: y });
    const x = r.left + r.width * fx, y = r.top + r.height * fy;
    el.dispatchEvent(mk("pointerdown", x, y));
    el.dispatchEvent(mk("pointerup", x, y));
    const dot = el.querySelector(".spectrum-dot");
    const trail = [];
    const t0 = performance.now();
    for (let i = 0; i < ms / 100; i++) {
      await new Promise((r2) => setTimeout(r2, 100));
      trail.push({ t: Math.round(performance.now() - t0), left: dot.style.left, top: dot.style.top, label: el.getAttribute("aria-label") });
    }
    return { requested: { s: +(fx*100).toFixed(0) + "%", v: +((1-fy)*100).toFixed(0) + "%" }, trail };
  }, [fx, fy, ms]);
}
const p1 = await pickAndWatch(page, 0.25, 0.25);
console.log("P1 default-space pick s=25% v=75%:");
console.log("  requested:", JSON.stringify(p1.requested));
for (const s of p1.trail) console.log(`   t=${String(s.t).padStart(4)}ms left=${s.left} top=${s.top}  ${s.label}`);

// ============ P2: multi-pointer — second pointer steers the drag ============
const p2 = await page.evaluate(async () => {
  const el = document.querySelector(".spectrum-picker");
  const r = el.getBoundingClientRect();
  const mk = (type, x, y, pid) => new PointerEvent(type, { bubbles: true, cancelable: true, composed: true, pointerId: pid, pointerType: "touch", isPrimary: pid === 1, button: 0, buttons: type === "pointerup" ? 0 : 1, clientX: x, clientY: y });
  const dot = el.querySelector(".spectrum-dot");
  // pointer 1 presses top-left
  el.dispatchEvent(mk("pointerdown", r.left + r.width * 0.1, r.top + r.height * 0.1, 1));
  await new Promise(res => requestAnimationFrame(res)); await new Promise(res => requestAnimationFrame(res));
  const afterP1 = { left: dot.style.left, top: dot.style.top };
  // pointer 2 (a second finger) MOVES over the plate at bottom-right — never pressed here
  el.dispatchEvent(mk("pointermove", r.left + r.width * 0.9, r.top + r.height * 0.9, 2));
  await new Promise(res => requestAnimationFrame(res)); await new Promise(res => requestAnimationFrame(res));
  const afterP2Move = { left: dot.style.left, top: dot.style.top };
  // pointer 2 lifts -> does it end pointer 1's drag?
  el.dispatchEvent(mk("pointerup", r.left + r.width * 0.9, r.top + r.height * 0.9, 2));
  await new Promise(res => requestAnimationFrame(res));
  // pointer 1 keeps moving -> is it still tracked?
  el.dispatchEvent(mk("pointermove", r.left + r.width * 0.5, r.top + r.height * 0.5, 1));
  await new Promise(res => requestAnimationFrame(res)); await new Promise(res => requestAnimationFrame(res));
  const afterP1Continues = { left: dot.style.left, top: dot.style.top };
  el.dispatchEvent(mk("pointerup", r.left + r.width * 0.5, r.top + r.height * 0.5, 1));
  return { afterP1, afterP2Move, afterP1Continues };
});
console.log("P2 multi-pointer:", JSON.stringify(p2));

// ============ P3: kelvin — dot vs model after a pick ============
await page.getByLabel("Select color space").first().click();
await page.waitForTimeout(400);
await page.getByRole("option", { name: /^Kelvin$/ }).first().click();
await page.waitForTimeout(900);
const kBefore = await page.evaluate(() => ({ url: location.href.slice(0,170), readout: Array.from(document.querySelectorAll('[role="textbox"][aria-label$="component value"]')).filter(e=>e.offsetParent).map(e=>e.innerText.trim()) }));
const p3 = await pickAndWatch(page, 0.2, 0.2, 1200);
const kAfter = await page.evaluate(() => ({ url: location.href.slice(0,170), readout: Array.from(document.querySelectorAll('[role="textbox"][aria-label$="component value"]')).filter(e=>e.offsetParent).map(e=>e.innerText.trim()) }));
console.log("P3 KELVIN pick s=20% v=80%: requested", JSON.stringify(p3.requested));
for (const s of p3.trail) console.log(`   t=${String(s.t).padStart(4)}ms left=${s.left} top=${s.top}  ${s.label}`);
console.log("  kelvin before:", JSON.stringify(kBefore));
console.log("  kelvin after :", JSON.stringify(kAfter));
await page.screenshot({ path: OUT + "/kelvin-after-pick.png" });

console.log("ERRORS:", JSON.stringify(errs.slice(0,8)));
await browser.close();

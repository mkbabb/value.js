// CHALLENGE-D wb-gradient-stopeditor probe 5 — destructive contextmenu, silent no-ops, add-without-undo.
import { chromium } from "playwright";
const URL = "http://localhost:9000/#/gradient";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errs = [];
page.on("pageerror", e => errs.push(String(e).slice(0, 160)));
await page.goto(URL, { waitUntil: "networkidle", timeout: 45000 });
await page.waitForTimeout(2200);
const labels = () => page.evaluate(() => [...document.querySelectorAll("[data-stop-id]")].map(h => h.getAttribute("aria-label")));
const css = () => page.evaluate(() => document.querySelector('[contenteditable="true"]').innerText.replace(/\s+/g, " ").trim());
const geo = await page.evaluate(() => { const b = document.querySelector('[data-testid="gradient-stop-bar"]').getBoundingClientRect(); return { x: b.x, y: b.y, w: b.width, cy: b.y + b.height / 2 }; });

console.log("start:", JSON.stringify(await labels()));
// A. Delete key at exactly 2 stops — is anything communicated?
await page.evaluate(() => document.querySelector("[data-stop-id]").focus());
await page.keyboard.press("Delete");
await page.waitForTimeout(300);
console.log("A after Delete @2 stops:", JSON.stringify(await labels()),
  "| live regions:", JSON.stringify(await page.evaluate(() => [...document.querySelectorAll("[role=status],[aria-live]")].map(n => (n.textContent || "").trim()).filter(Boolean))));

// B. add a stop by clicking, then right-click it → destroyed without confirmation?
await page.mouse.click(geo.x + geo.w * 0.5, geo.cy);
await page.waitForTimeout(400);
console.log("B after click-add:", JSON.stringify(await labels()), "|", await css());
const mid = await page.evaluate(() => { const b = document.querySelectorAll("[data-stop-id]")[1].getBoundingClientRect(); return { x: b.x + b.width / 2, y: b.y + b.height / 2 }; });
await page.mouse.click(mid.x, mid.y, { button: "right" });
await page.waitForTimeout(400);
console.log("B after right-click:", JSON.stringify(await labels()), "|", await css());
console.log("   any dialog/confirm/undo affordance:", JSON.stringify(await page.evaluate(() =>
  ({ dialogs: document.querySelectorAll("[role=dialog]").length,
     undoText: [...document.querySelectorAll("button")].map(b => (b.getAttribute("aria-label") || b.textContent || "").trim()).filter(t => /undo|revert/i.test(t)) }))));

// C. accessible state of the selected handle
await page.mouse.click(geo.x + geo.w * 0.25, geo.cy); // add
await page.waitForTimeout(400);
const sel = await page.evaluate(() => {
  const hs = [...document.querySelectorAll("[data-stop-id]")];
  return hs.map(h => ({ label: h.getAttribute("aria-label"), attrs: [...h.attributes].map(a => a.name + "=" + a.value.slice(0, 24)).filter(a => a.startsWith("aria") || a.startsWith("role")) }));
});
console.log("C selected-state attrs:", JSON.stringify(sel, null, 1));
console.log("errors:", JSON.stringify(errs));
await browser.close();

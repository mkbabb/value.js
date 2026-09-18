import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errs = []; page.on("pageerror", e => errs.push("PAGEERROR: " + e.message));
page.on("console", m => { if (m.type() === "error" && !/MISCONFIGURED/.test(m.text())) errs.push("ERR: " + m.text().slice(0,220)); });

// A: powerless / `none` channels via the URL entry point
for (const c of ["oklch(none none none)", "oklch(50% none none)", "hsl(none none none)"]) {
  errs.length = 0;
  await page.goto("http://localhost:9000/#/?space=oklch&color=" + encodeURIComponent(c), { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(1200);
  const st = await page.evaluate(() => ({
    spectrum: !!document.querySelector(".spectrum-picker"),
    label: document.querySelector(".spectrum-picker")?.getAttribute("aria-label") ?? null,
    dot: (() => { const d = document.querySelector(".spectrum-dot"); return d ? d.style.left + "/" + d.style.top : null; })(),
    bodyLen: document.body.innerText.length,
  }));
  console.log(`A "${c}" ->`, JSON.stringify(st), "errors:", JSON.stringify(errs.slice(0,2)));
}

// B: Tab sweep — can a keyboard user ever land on the spectrum?
await page.goto("http://localhost:9000/", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1500);
let hit = false; const seen = [];
for (let i = 0; i < 40; i++) {
  await page.keyboard.press("Tab");
  const a = await page.evaluate(() => { const e = document.activeElement; return { cls: (e.className || "").toString().slice(0, 40), tag: e.tagName, label: e.getAttribute?.("aria-label") || e.textContent?.trim().slice(0,24) }; });
  seen.push(a.tag + ":" + (a.label || a.cls).slice(0,22));
  if (a.cls.includes("spectrum-picker")) { hit = true; break; }
}
console.log("B tab sweep hit spectrum:", hit);
console.log("B focus order (40 tabs):", seen.join(" > "));

// C: arrow keys after clicking the plate — any keyboard control at all?
await page.locator(".spectrum-picker").click({ position: { x: 100, y: 100 } });
const before = await page.locator(".spectrum-picker").getAttribute("aria-label");
for (const k of ["ArrowRight","ArrowRight","ArrowUp","ArrowUp"]) await page.keyboard.press(k);
await page.waitForTimeout(400);
const after = await page.locator(".spectrum-picker").getAttribute("aria-label");
console.log("C arrows:", before, "->", after, "| changed:", before !== after);
console.log("C activeElement after plate click:", await page.evaluate(() => document.activeElement.tagName + "." + (document.activeElement.className||"").toString().slice(0,30)));
await browser.close();

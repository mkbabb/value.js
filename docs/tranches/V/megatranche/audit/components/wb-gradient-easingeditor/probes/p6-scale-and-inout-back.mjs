import { chromium } from "playwright";
const b = await chromium.launch({ args: ["--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader"], channel: "chromium" });
const page = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
const errs=[],pes=[]; page.on("console",m=>{if(m.type()==="error")errs.push(m.text());}); page.on("pageerror",e=>pes.push(String(e.message??e)));

await page.goto("http://localhost:9000/", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(5000);
const pill = page.locator(".glass-dock.collapsed"); if (await pill.count()) { await pill.click(); await page.waitForTimeout(900); }
await page.getByRole("combobox", { name: "Select view" }).click({ timeout: 60000 }); await page.waitForTimeout(500);
await page.getByRole("option", { name: "Gradient", exact: true }).click();
await page.locator("#easing-interval-0").waitFor({ state: "visible", timeout: 20000 });
await page.waitForTimeout(700);

const snap = () => page.evaluate(() => ({
  heads: document.querySelectorAll("button[aria-controls^='easing-interval-']").length,
  tiles: document.querySelectorAll("[data-specimen]").length,
  pickers: document.querySelectorAll("[data-testid='easing-picker']").length,
  glyphPts: [...document.querySelectorAll("[data-specimen] path")].reduce((n,p)=>n+(p.getAttribute("d")||"").split(" L ").length,0),
  all: document.querySelectorAll("*").length,
}));
console.log("DOM @2 stops:", JSON.stringify(await snap()));

// ── perf: one direction-slider tick, measured
const cost = await page.evaluate(async () => {
  const sl = document.querySelector("[aria-label='Gradient direction'] [role='slider']") || document.querySelector("[role='slider'][aria-label*='irection']");
  if (!sl) return "no direction slider";
  sl.focus();
  const t0 = performance.now();
  for (let i = 0; i < 30; i++) {
    sl.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
    await new Promise(r => requestAnimationFrame(r));
  }
  return { msPer30Ticks: +(performance.now() - t0).toFixed(1) };
});
console.log("30 direction ticks:", JSON.stringify(cost));

// ── 6-stop gradient through the code editor
const ta = page.locator("textarea").last();
console.log("textarea count:", await page.locator("textarea").count());
await ta.click();
await page.keyboard.press("ControlOrMeta+a");
await page.keyboard.press("Backspace");
await ta.fill("linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.7 0.16 200) 20%, oklch(0.65 0.18 265) 40%, oklch(0.6 0.2 320) 60%, oklch(0.7 0.14 60) 80%, oklch(0.8 0.1 100) 100%)");
await page.waitForTimeout(1600);
console.log("DOM @6 stops:", JSON.stringify(await snap()));

// ── ease-in-out-back: crashes through the RAMP path only (fn(0.5) is in-range)
const row = page.locator("#easing-interval-0");
console.log("\n--- press ease-in-out-back ---");
const n0 = pes.length;
await row.locator("[data-specimen='ease-in-out-back']").first().click().catch(e=>console.log("click err:", e.message.slice(0,100)));
await page.waitForTimeout(1000);
console.log("bench alive after:", await page.locator("button[aria-controls^='easing-interval-']").count());
console.log("try-again visible:", await page.getByRole("button", { name: /try again/i }).count());
console.log("pageerrors:", JSON.stringify(pes.slice(n0)));
console.log("console errors:", JSON.stringify(errs.filter(e=>!e.includes("MISCONFIGURED"))));
await b.close();

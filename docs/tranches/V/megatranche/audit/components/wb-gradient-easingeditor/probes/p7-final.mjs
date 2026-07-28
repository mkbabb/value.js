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
await page.waitForTimeout(800);
const row = page.locator("#easing-interval-0");

await page.screenshot({ path: "docs/tranches/V/megatranche/audit/components/wb-gradient-easingeditor/probes/bench-rest.png" });

// long-task attribution for 20 direction ticks
const perf = await page.evaluate(async () => {
  const tasks = []; const po = new PerformanceObserver(l => { for (const e of l.getEntries()) tasks.push(+e.duration.toFixed(1)); });
  po.observe({ entryTypes: ["longtask"] });
  const sl = document.querySelector("[aria-label='Gradient direction'] [role='slider']");
  if (!sl) return "no slider";
  sl.focus();
  const t0 = performance.now();
  for (let i = 0; i < 20; i++) { sl.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true })); await new Promise(r => requestAnimationFrame(r)); }
  const total = performance.now() - t0;
  await new Promise(r => setTimeout(r, 400)); po.disconnect();
  return { totalMs: +total.toFixed(1), perTickMs: +(total/20).toFixed(1), longTasks: tasks.length, longTaskMax: Math.max(0,...tasks), longTaskSum: +tasks.reduce((a,c)=>a+c,0).toFixed(1) };
});
console.log("20 direction ticks (whole page):", JSON.stringify(perf));

// accessible names in the OPEN row (duplication / operability)
console.log("OPEN-ROW CONTROLS:", JSON.stringify(await page.evaluate(() => {
  const host = document.querySelector("#easing-interval-0");
  return [...host.querySelectorAll("button,[role='button'],[role='slider']")].slice(0,6).map(el => ({
    name: el.getAttribute("aria-label") ?? el.textContent.trim().slice(0,20),
    role: el.getAttribute("role") ?? el.tagName.toLowerCase(),
    state: el.getAttribute("data-state") ?? el.getAttribute("aria-pressed") ?? el.getAttribute("aria-expanded") ?? null,
  }));
}), null, 1));
console.log("tile role/selected semantics:", JSON.stringify(await page.evaluate(() => {
  const t = document.querySelector("#easing-interval-0 [data-specimen='ease']");
  return t ? { tag: t.tagName, role: t.getAttribute("role"), ariaPressed: t.getAttribute("aria-pressed"), ariaSelected: t.getAttribute("aria-selected"), dataState: t.getAttribute("data-state"), label: t.getAttribute("aria-label") } : "none";
})));

console.log("\n--- press ease-in-out-back (fn(0.5) IS in range; the RAMP samples are not) ---");
const n0 = pes.length;
await row.locator("[data-specimen='ease-in-out-back']").first().click().catch(e=>console.log("click err:", e.message.slice(0,90)));
await page.waitForTimeout(1000);
console.log("bench alive after:", await page.locator("button[aria-controls^='easing-interval-']").count());
console.log("render tile after:", await page.locator("[data-testid='gradient-render-tile']").count());
console.log("try-again visible:", await page.getByRole("button", { name: /try again/i }).count());
console.log("pageerrors:", JSON.stringify(pes.slice(n0)));
console.log("console errors:", JSON.stringify(errs.filter(e=>!e.includes("MISCONFIGURED"))));
await b.close();

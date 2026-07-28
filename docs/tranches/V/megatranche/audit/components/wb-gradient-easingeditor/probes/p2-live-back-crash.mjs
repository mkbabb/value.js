import { chromium } from "playwright";

const b = await chromium.launch({ args: ["--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader"], channel: "chromium" });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errs = [], pageErrs = [];
page.on("console", m => { if (m.type() === "error") errs.push(m.text()); });
page.on("pageerror", e => pageErrs.push(String(e.message ?? e)));

await page.goto("http://localhost:9000/", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2500);

// open the Gradient view via the dock (the e2e openView idiom)
const pill = page.locator(".glass-dock.collapsed");
if (await pill.count()) { await pill.click(); await page.waitForTimeout(800); }
const viewSelect = page.getByRole("combobox", { name: "Select view" });
await viewSelect.click();
await page.waitForTimeout(400);
await page.getByRole("option", { name: "Gradient", exact: true }).click();
await page.waitForTimeout(1500);

const head = page.locator("button[aria-controls^='easing-interval-']").first();
console.log("easing heads found:", await page.locator("button[aria-controls^='easing-interval-']").count());
if (await head.count() === 0) { console.log("NO EASING BENCH — snapshot of main:"); console.log((await page.locator("main").first().innerText().catch(()=> "n/a")).slice(0,800)); await b.close(); process.exit(0); }

if ((await head.getAttribute("aria-expanded")) !== "true") await head.click();
await page.waitForTimeout(400);

const row = page.locator("#easing-interval-0");
console.log("row visible:", await row.isVisible());
console.log("literal before:", await row.locator("code").first().textContent());

// count DOM cost
const counts = await page.evaluate(() => {
  const rows = document.querySelectorAll("button[aria-controls^='easing-interval-']").length;
  const tiles = document.querySelectorAll("[data-specimen]").length;
  const paths = document.querySelectorAll("[data-specimen] path").length;
  const pickers = document.querySelectorAll("[data-testid='easing-picker']").length;
  const total = document.querySelectorAll("*").length;
  return { rows, tiles, paths, pickers, totalNodes: total };
});
console.log("DOM:", JSON.stringify(counts));

console.log("\n--- clicking ease-out-back tile in row 0 ---");
const errsBefore = pageErrs.length;
await row.locator("[data-specimen='ease-out-back']").first().click();
await page.waitForTimeout(900);
console.log("row0 still visible:", await row.isVisible().catch(e => "DETACHED: " + e.message));
console.log("literal after:", await row.locator("code").first().textContent().catch(e => "GONE: " + e.message));
console.log("bench heads after:", await page.locator("button[aria-controls^='easing-interval-']").count());
console.log("render tile present:", await page.locator("[data-testid='gradient-render-tile']").count());
console.log("pageerrors since click:", JSON.stringify(pageErrs.slice(errsBefore), null, 2));

console.log("\n--- clicking ease-in-back ---");
const eb = pageErrs.length;
await row.locator("[data-specimen='ease-in-back']").first().click().catch(e => console.log("click failed:", e.message.slice(0,200)));
await page.waitForTimeout(700);
console.log("pageerrors since:", JSON.stringify(pageErrs.slice(eb), null, 2));

console.log("\nALL console errors:", JSON.stringify(errs, null, 2));
console.log("ALL pageerrors:", JSON.stringify(pageErrs, null, 2));
await page.screenshot({ path: "docs/tranches/V/megatranche/audit/components/wb-gradient-easingeditor/probes/after-back.png", fullPage: false });
await b.close();

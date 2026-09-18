import { webkit } from "playwright";
const b = await webkit.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:9000/#/atmosphere", { waitUntil: "networkidle" }); await p.waitForTimeout(1800);
await p.locator("[aria-label='Palette harmony']").click(); await p.waitForTimeout(700);
const atmo = await p.evaluate(()=>[...document.querySelectorAll("[role='option']")].map(o=>o.querySelector("span:not([aria-hidden])")?.textContent?.trim()||o.textContent.trim().split("\n")[0]));
console.log("/#/atmosphere harmony options:", JSON.stringify(atmo));
await p.keyboard.press("Escape"); await p.waitForTimeout(400);
await p.goto("http://localhost:9000/#/generate", { waitUntil: "networkidle" }); await p.waitForTimeout(1800);
const trig = await p.evaluate(()=>[...document.querySelectorAll("[role='combobox']")].map(t=>({label:t.getAttribute("aria-label"), text:t.textContent.trim().slice(0,40)})));
console.log("/#/generate combos:", JSON.stringify(trig));
for (const t of await p.locator("[role='combobox']").all()) {
  const al = await t.getAttribute("aria-label");
  if (al && /harmon/i.test(al)) { await t.click(); break; }
}
await p.waitForTimeout(700);
const gen = await p.evaluate(()=>[...document.querySelectorAll("[role='option']")].map(o=>o.textContent.trim().split("\n")[0]));
console.log("/#/generate harmony options:", JSON.stringify(gen));
await b.close();

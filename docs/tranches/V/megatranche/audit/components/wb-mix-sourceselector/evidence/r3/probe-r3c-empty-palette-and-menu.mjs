import { chromium } from "playwright";
const now = new Date().toISOString();
const store = { version: 1, palettes: [
  { id: "local-empty", name: "Empty One", slug: "empty-one", colors: [], createdAt: now, updatedAt: now, isLocal: true },
  { id: "local-ok", name: "Sunrise", slug: "sunrise", colors: [{ css: "#ff5a5f", position: 0 }, { css: "#ffb400", position: 1 }], createdAt: now, updatedAt: now, isLocal: true },
]};
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
page.on("console", (m) => { if (m.type() === "error") errs.push("CONSOLE " + m.text().slice(0,200)); });
page.on("pageerror", (e) => errs.push("PAGEERROR " + e.message.slice(0,300)));
await page.addInitScript((s) => window.localStorage.setItem("color-palettes", JSON.stringify(s)), store);
await page.goto("http://localhost:9000/#/mix", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
await page.getByRole("button", { name: "Palettes", exact: true }).click();
await page.waitForTimeout(1200);
console.log("CARDS", await page.locator("main [role='article']").count());
// select both, incl. the empty one, then Mix
await page.getByRole("button", { name: /Select palette Empty One/ }).click({ timeout: 3000 }).catch(e=>console.log("E1",String(e).split("\n")[0]));
await page.getByRole("button", { name: /Select palette Sunrise/ }).click({ timeout: 3000 }).catch(e=>console.log("E2",String(e).split("\n")[0]));
await page.waitForTimeout(300);
const mixBtn = page.getByRole("button", { name: "Mix", exact: true });
console.log("MIX-DISABLED", await mixBtn.isDisabled());
await mixBtn.click({ timeout: 3000 }).catch(e=>console.log("E3",String(e).split("\n")[0]));
await page.waitForTimeout(2500);
console.log("RESULT-TEXT", (await page.locator("main").innerText()).replace(/\n+/g,' | ').slice(0,400));
// now click the nested Palette menu inside a selected card and see if selection toggles
const before = await page.locator("[data-mix-source]").count();
await page.getByRole("button", { name: "Palette menu" }).first().click({ timeout: 3000 }).catch(e=>console.log("E4",String(e).split("\n")[0]));
await page.waitForTimeout(600);
const after = await page.locator("[data-mix-source]").count();
console.log("MIXSOURCES before/after menu-click", before, after);
console.log("MENU-OPEN", await page.locator("[role='menu']").count());
console.log("ERRS", JSON.stringify(errs, null, 1));
await browser.close();

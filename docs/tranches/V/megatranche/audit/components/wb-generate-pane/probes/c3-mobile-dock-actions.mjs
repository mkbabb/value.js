// C-3 probe: on MOBILE the pane-action ref is never wired (App.vue mobile
// <PaneSlot> has no :on-mount), so the dock action bar's Generate verbs
// dispatch onto `undefined` and the `?.` chain swallows it silently.
// Read-only against the LIVE dev server.
import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 3 });
const page = await ctx.newPage();
const errs = [];
page.on("pageerror", (e) => errs.push("PAGEERROR " + e.message));

await page.goto("http://localhost:9000/#/generate", { waitUntil: "domcontentloaded" });
await page.waitForSelector("[data-generate-plate]", { timeout: 30000 });
console.log("viewport:", page.viewportSize());

const plate = page.locator("[data-generate-plate]");
const seedOf = async () => (await plate.getByText(/seed: [0-9a-f]{8}/).textContent()).trim();

// 1 · the IN-PLATE Regenerate (the pane's own button) must work.
const before1 = await seedOf();
await plate.getByRole("button", { name: "Regenerate" }).click();
await page.waitForTimeout(300);
const after1 = await seedOf();
console.log("IN-PLATE Regenerate:", before1, "->", after1, after1 !== before1 ? "WORKS" : "DEAD");

// 2 · open the dock action bar (Tools) and use its Regenerate.
const toolsBtn = page.getByRole("button", { name: /Toggle action bar/i });
console.log("dock Tools toggle count:", await toolsBtn.count());
if (await toolsBtn.count()) {
    await toolsBtn.first().click();
    await page.waitForTimeout(500);
}
const dockActions = await page.evaluate(() =>
    [...document.querySelectorAll(".glass-dock button, .glass-dock [role=button]")]
        .map((b) => (b.getAttribute("aria-label") || b.getAttribute("title") || b.textContent || "").trim().slice(0, 30))
        .filter(Boolean));
console.log("dock controls now:", JSON.stringify(dockActions));

const dockRegen = page.locator("body").getByRole("button", { name: /^Regenerate$/i });
console.log("dock Regenerate count:", await dockRegen.count());
if (await dockRegen.count()) {
    const before2 = await seedOf();
    await dockRegen.first().click();
    await page.waitForTimeout(500);
    const after2 = await seedOf();
    console.log("DOCK Regenerate:", before2, "->", after2, after2 !== before2 ? "WORKS" : "DEAD (no-op)");
}

// 3 · dock Save palette — does anything land in localStorage?
await page.evaluate(() => localStorage.removeItem("color-palettes"));
const dockSave = page.getByRole("button", { name: /^Save palette$/i });
console.log("dock Save count:", await dockSave.count());
if (await dockSave.count()) {
    await dockSave.first().click();
    await page.waitForTimeout(500);
    const stored = await page.evaluate(() => localStorage.getItem("color-palettes"));
    console.log("after DOCK Save, localStorage:", stored === null ? "NULL (nothing saved -> DEAD)" : stored.slice(0, 120));
}

console.log("pageErrors:", errs.join(" | ") || "(none)");

// 4 · desktop control: same actions with the desktop layout wired.
const ctx2 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const p2 = await ctx2.newPage();
await p2.goto("http://localhost:9000/#/generate", { waitUntil: "domcontentloaded" });
await p2.waitForSelector("[data-generate-plate]", { timeout: 30000 });
const plate2 = p2.locator("[data-generate-plate]");
const seed2 = async () => (await plate2.getByText(/seed: [0-9a-f]{8}/).textContent()).trim();
const t2 = p2.getByRole("button", { name: /Toggle action bar/i });
if (await t2.count()) { await t2.first().click(); await p2.waitForTimeout(500); }
const dr2 = p2.getByRole("button", { name: /^Regenerate$/i });
console.log("[desktop] dock Regenerate count:", await dr2.count());
if (await dr2.count()) {
    const b = await seed2(); await dr2.first().click(); await p2.waitForTimeout(500);
    const a = await seed2();
    console.log("[desktop] DOCK Regenerate:", b, "->", a, a !== b ? "WORKS" : "DEAD (no-op)");
}

await browser.close();

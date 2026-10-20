// SS-8 B23 cure probe — mix.spec's own path: "/" -> dock "Select view" -> "Mix", then
// a 20 s census of the MAIN_PANE relation and the add slot (what :53 waits on).
import { chromium } from "@playwright/test";
const origin = process.argv[2] ?? "http://localhost:9123";
const MAIN_PANE = 'main[aria-labelledby="route-title"]:has(h1#route-title)';
const browser = await chromium.launch();
try {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
    try {
        const page = await ctx.newPage();
        const errs = [];
        page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errs.push(m.text().slice(0, 200)); });
        page.on("pageerror", (e) => errs.push("PAGEERROR " + String(e).slice(0, 200)));
        const t0 = Date.now();
        await page.goto(`${origin}/`, { timeout: 180000, waitUntil: "domcontentloaded" });
        const tLoad = Date.now() - t0;
        const dock = page.locator("[data-dock-collapsed], .dock").first();
        const sel = page.getByRole("combobox", { name: "Select view" });
        if (!(await sel.isVisible().catch(() => false))) {
            // expandDock fallback: hover/click the dock surface
            await page.getByRole("button", { name: /expand|open dock/i }).first().click({ timeout: 5000 }).catch(() => {});
        }
        await sel.click({ timeout: 60000 });
        await page.getByRole("option", { name: "Mix", exact: true }).click({ timeout: 30000 });
        const tPick = Date.now() - t0;
        const census = [];
        for (let i = 0; i < 20; i++) {
            census.push(await page.evaluate((MP) => ({
                t: Math.round(performance.now()),
                hash: location.hash,
                mainPane: document.querySelectorAll(MP).length,
                h1: [...document.querySelectorAll("h1")].map((h) => `${h.id}:${h.textContent.trim()}`),
                addSlotAll: document.querySelectorAll(".add-slot-ghost").length,
                addSlotInMain: document.querySelectorAll(`${MP} .add-slot-ghost`).length,
            }), MAIN_PANE));
            if (census.at(-1).addSlotInMain > 0) break;
            await page.waitForTimeout(1000);
        }
        const mainShape = await page.evaluate(() => { const m = document.querySelector("main"); return m ? { kids: [...m.children].map((c) => `${c.tagName.toLowerCase()}.${String(c.className).slice(0, 60)}`), text: m.innerText.slice(0, 300), busy: [...m.querySelectorAll("[aria-busy]")].map((b) => b.getAttribute("aria-busy")) } : null; });
        console.log(JSON.stringify({ tLoad, tPick, last: census.at(-1), first: census[0], n: census.length, mainShape, errs: errs.slice(0, 25) }, null, 1));
    } finally { await ctx.close(); }
} finally { await browser.close(); }

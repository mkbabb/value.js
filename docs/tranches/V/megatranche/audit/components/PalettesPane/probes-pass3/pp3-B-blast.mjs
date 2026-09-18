// PROBE B — blast radius of the malformed-store crash + orphan visibility.
import { chromium } from "playwright";
const KEY = "color-palettes";
const BAD = JSON.stringify({ version: 1 });                 // passes read()'s only check
const ORPH = JSON.stringify({ version: 1, palettes: [
    { id: "a", name: "Visible", slug: "visible", colors: [{ css: "#f00", position: 0 }], createdAt: "x", updatedAt: "x", isLocal: true },
    { name: "OrphanNoId", slug: "orphan", colors: [{ css: "#0f0", position: 0 }], createdAt: "x", updatedAt: "x", isLocal: true },
] });

const browser = await chromium.launch();

// B1 — every route, malformed store
const routes = ["/#/", "/#/palettes", "/#/browse", "/#/blob", "/#/admin/users"];
console.log("=== B1 blast radius (store = " + BAD + ") ===");
for (const r of routes) {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    const errs = [];
    page.on("pageerror", (e) => errs.push(String(e.message).slice(0, 90)));
    await page.addInitScript(([k, v]) => localStorage.setItem(k, v), [KEY, BAD]);
    await page.goto("http://localhost:9000" + r, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2200);
    const m = await page.evaluate(() => ({
        appHTMLLen: (document.querySelector("#app")?.innerHTML || "").length,
        bodyText: (document.body.innerText || "").trim().length,
        canvases: document.querySelectorAll("canvas").length,
    }));
    console.log(r.padEnd(16), JSON.stringify(m), "pageErrors:", errs.length, errs[0] ?? "");
    await ctx.close();
}

// B2 — does it self-heal on reload? (persistence of the brick)
console.log("\n=== B2 persistence across reloads (same context) ===");
{
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await page.addInitScript(([k, v]) => localStorage.setItem(k, v), [KEY, BAD]);
    await page.goto("http://localhost:9000/#/palettes", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    for (let i = 0; i < 3; i++) {
        await page.reload({ waitUntil: "domcontentloaded" });
        await page.waitForTimeout(1800);
        const m = await page.evaluate(() => ({
            bodyText: (document.body.innerText || "").trim().length,
            stored: localStorage.getItem("color-palettes"),
        }));
        console.log("reload", i + 1, JSON.stringify(m));
    }
    await ctx.close();
}

// B3 — orphan palette: stored but invisible & unreachable
console.log("\n=== B3 orphan (isLocal:true, no id) ===");
{
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await page.addInitScript(([k, v]) => localStorage.setItem(k, v), [KEY, ORPH]);
    await page.goto("http://localhost:9000/#/palettes", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2200);
    const before = await page.evaluate(() => ({
        stored: JSON.parse(localStorage.getItem("color-palettes")).palettes.map((p) => p.name),
        rendered: [...document.querySelectorAll('[role="article"]')].map((e) => e.getAttribute("aria-label")),
        badge: document.querySelector(".pane-header-title")?.textContent?.trim(),
    }));
    console.log("before delete-all:", JSON.stringify(before));
    // click the delete-all trigger then confirm
    await page.click('[aria-label="Delete all saved palettes"]').catch(() => {});
    await page.waitForTimeout(400);
    await page.getByRole("button", { name: /Delete all/i }).last().click().catch(() => {});
    await page.waitForTimeout(600);
    const after = await page.evaluate(() => ({
        stored: JSON.parse(localStorage.getItem("color-palettes")).palettes.map((p) => p.name ?? "?"),
        rendered: [...document.querySelectorAll('[role="article"]')].length,
    }));
    console.log("after  delete-all:", JSON.stringify(after));
    await ctx.close();
}

await browser.close();

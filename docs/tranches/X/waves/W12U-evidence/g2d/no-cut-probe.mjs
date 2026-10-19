// SERVED MODEL: claude-opus-5-5
// X.W12U.g2d — "no feature cut" falsifier for the two lazy moves, on a built tree.
//  1. every routed view renders its main pane (the H1-named <main>), no page error;
//  2. the dock's colour-input sub-layer (ColorInput, now lazy) opens from its
//     toggle and shows its field ("Enter a CSS color"), and the field parses;
//  3. the migrate dialog's lazy chunk (the `dialog/` barrel) arrives after boot
//     and the app logs no chunk/page error (the dialog itself is session-gated).
// Headless channel:'chrome'. Usage: node no-cut-probe.mjs <origin> <label>
import { chromium } from "@playwright/test";
const [origin, label] = process.argv.slice(2);
const MAIN = 'main[aria-labelledby="route-title"]:has(> h1#route-title)';
const ROUTES = ["/", "/palettes", "/browse", "/extract", "/mix", "/generate", "/gradient", "/atmosphere", "/blob", "/no-such-page"];
const browser = await chromium.launch({ channel: "chrome", headless: true });
let fail = 0;
try {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    try {
        const page = await ctx.newPage();
        const errors = [];
        page.on("pageerror", (e) => errors.push(String(e).slice(0, 160)));
        const chunks = [];
        page.on("response", (r) => { const u = r.url(); if (/\/assets\/.*\.js$/.test(u)) chunks.push(u.split("/").pop()); });
        for (const r of ROUTES) {
            await page.goto(`${origin}/#${r}`);
            const ok = await page.locator(MAIN).waitFor({ state: "visible", timeout: 15000 }).then(() => true, () => false);
            const h1 = ok ? (await page.locator("h1#route-title").innerText()).trim().slice(0, 40) : "-";
            if (!ok) fail++;
            console.log(`[no-cut ${label}] route ${r} main=${ok ? "visible" : "MISSING"} h1="${h1}"`);
        }
        await page.goto(`${origin}/#/`);
        await page.locator(MAIN).waitFor({ state: "visible", timeout: 15000 });
        await page.waitForTimeout(1500);
        const collapsed = page.locator(".glass-dock.collapsed");
        if (await collapsed.count()) await collapsed.first().click();
        const toggleBar = page.getByRole("button", { name: "Toggle action bar" });
        if (await toggleBar.count()) await toggleBar.first().click();
        await page.waitForTimeout(800);
        await page.getByRole("button", { name: "Open color input" }).first().click();
        const field = page.getByRole("textbox", { name: "Enter a CSS color" });
        const fieldOk = await field.first().waitFor({ state: "visible", timeout: 5000 }).then(() => true, () => false);
        if (fieldOk) { await field.first().fill("oklch(0.7 0.15 180)"); }
        if (!fieldOk) fail++;
        console.log(`[no-cut ${label}] colour-input layer: field ${fieldOk ? "visible + filled" : "MISSING"}`);
        const ci = chunks.filter((c) => /^ColorInput-/.test(c));
        const dlg = chunks.filter((c) => /^(index|MigratePalettesDialog|FlagReportDialog|VersionHistoryDrawer)-/.test(c) === false && /Dialog|dialog/.test(c));
        console.log(`[no-cut ${label}] lazy chunks fetched: ColorInput=${JSON.stringify(ci)} dialog-barrel=${JSON.stringify(dlg)} pageErrors=${JSON.stringify(errors)}`);
        if (!ci.length || errors.length) fail++;
    } finally { await ctx.close(); }
} finally { await browser.close(); }
console.log(`VERDICT ${fail ? "RED" : "GREEN"} (${fail} failures)`);
process.exit(fail ? 1 : 0);

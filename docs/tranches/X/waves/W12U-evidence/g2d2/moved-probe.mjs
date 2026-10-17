// SERVED MODEL: claude-opus-5-5
// X.W12U.g2d2 — "no feature cut" falsifier for the two lazy moves, on a built tree.
//  1. 1440x900: the @mbabb menu (ProfileSection) opens and its Avatar (`.avatar`) renders
//     inside the menu body (lazy Avatar arrived);
//  2. 390x844: the dock "Menu" (MobileMenuDropdown, anonymous) opens and its Avatar renders;
//  3. 1440x900 cold #/extract with the pane chunk held 2.5 s: the loading plate shows and
//     carries its two Skeleton bars (`[data-slot="skeleton"]`) BEFORE the pane arrives
//     (lazy Skeleton arrived), then the pane replaces the plate;
//  plus no page error anywhere. Headless channel:'chrome'. Usage: node moved-probe.mjs <origin> <label>
import { chromium } from "@playwright/test";
const [origin, label] = process.argv.slice(2);
const MAIN = 'main[aria-labelledby="route-title"]:has(> h1#route-title)';
const log = (s) => console.log(`[moved ${label}] ${s}`);
const browser = await chromium.launch({ channel: "chrome", headless: true });
let fail = 0;
const errors = [];
async function openDock(page) {
    const collapsed = page.locator(".glass-dock.collapsed");
    if (await collapsed.count()) await collapsed.first().click();
    await page.waitForTimeout(600);
}
async function menuAvatar(width, height, trigger, name) {
    const ctx = await browser.newContext({ viewport: { width, height } });
    try {
        const page = await ctx.newPage();
        page.on("pageerror", (e) => errors.push(String(e).slice(0, 160)));
        await page.goto(`${origin}/#/`);
        await page.locator(MAIN).waitFor({ state: "visible", timeout: 15000 });
        await page.waitForTimeout(1200);
        await openDock(page);
        const avatarsBefore = await page.locator('[role="menu"] .avatar').count();
        await trigger(page).first().click();
        const menu = page.locator('[role="menu"]');
        const menuOk = await menu.first().waitFor({ state: "visible", timeout: 5000 }).then(() => true, () => false);
        const av = menu.locator(".avatar");
        const avOk = await av.first().waitFor({ state: "attached", timeout: 5000 }).then(() => true, () => false);
        if (!menuOk || !avOk) fail++;
        log(`${name} ${width}x${height} menu=${menuOk ? "open" : "MISSING"} avatarBefore=${avatarsBefore} avatar=${avOk ? "rendered" : "MISSING"}`);
    } finally {
        await ctx.close();
    }
}
try {
    await menuAvatar(1440, 900, (p) => p.getByRole("button", { name: /@mbabb/ }), "ProfileSection@mbabb");
    await menuAvatar(390, 844, (p) => p.getByRole("button", { name: "Menu" }), "MobileMenuDropdown");
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    try {
        await ctx.route(/\/assets\/[^/]*Pane-[^/]*\.js$/, async (route) => {
            await new Promise((r) => setTimeout(r, 2500));
            await route.continue();
        });
        const page = await ctx.newPage();
        page.on("pageerror", (e) => errors.push(String(e).slice(0, 160)));
        await page.goto(`${origin}/#/extract`, { waitUntil: "commit" });
        const plate = page.locator(".pane-plate");
        const plateOk = await plate.first().waitFor({ state: "visible", timeout: 15000 }).then(() => true, () => false);
        const bars = plate.first().locator('[data-slot="skeleton"]');
        const barsOk = await page.waitForFunction(() => document.querySelectorAll('.pane-plate [data-slot="skeleton"]').length >= 2, null, { timeout: 2000 }).then(() => true, () => false);
        const nBars = plateOk ? await bars.count() : 0;
        const stillPlate = await plate.count();
        const paneOk = await page.locator(MAIN).waitFor({ state: "visible", timeout: 20000 }).then(() => true, () => false);
        const plateGone = await plate.count().then((n) => n === 0);
        if (!plateOk || !barsOk || !paneOk) fail++;
        log(`plate #/extract held=2500ms plate=${plateOk ? "shown" : "MISSING"} bars=${nBars} barsBeforePane=${barsOk && stillPlate > 0} pane=${paneOk ? "visible" : "MISSING"} plateGoneAfter=${plateGone}`);
    } finally {
        await ctx.close();
    }
} finally {
    await browser.close();
}
log(`pageErrors=${JSON.stringify(errors)}`);
if (errors.length) fail++;
log(`VERDICT ${fail ? "RED" : "GREEN"}`);
process.exit(fail ? 1 : 0);

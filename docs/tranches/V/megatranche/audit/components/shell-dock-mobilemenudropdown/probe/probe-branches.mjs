import { chromium } from "playwright";

const browser = await chromium.launch();
const out = {};

for (const [name, vp] of [["mobile-390", { width: 390, height: 844 }], ["desktop-1440", { width: 1440, height: 900 }]]) {
    const ctx = await browser.newContext({ viewport: vp });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/", { waitUntil: "networkidle" });
    await page.waitForTimeout(2000);
    out[name] = await page.evaluate(() => {
        const q = (s) => [...document.querySelectorAll(s)];
        const vis = (el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
        const mobileHost = q("nav .lg\\:hidden.flex.items-center").filter((el) => el.querySelector('[aria-label="Menu"]'));
        return {
            // both twins' hosts present in the DOM regardless of viewport?
            mobileMenuTriggerInDom: q('[aria-label="Menu"]').length,
            mobileMenuTriggerVisible: q('[aria-label="Menu"]').filter(vis).length,
            profileTriggerInDom: q('[data-o18="profile-trigger"]').length,
            desktopBranchHosts: q("nav .hidden.lg\\:flex").length,
            desktopBranchVisible: q("nav .hidden.lg\\:flex").filter(vis).length,
            mobileBranchHosts: mobileHost.length,
            mobileBranchVisible: mobileHost.filter(vis).length,
            // how many dropdown triggers exist at all in the dock
            dropdownTriggers: q(".dock-dropdown-trigger").length,
            dropdownTriggersVisible: q(".dock-dropdown-trigger").filter(vis).length,
            // login/@mbabb desktop buttons
            dockButtons: q("nav button").length,
            dockButtonsVisible: q("nav button").filter(vis).length,
            // the ink probe element the two twins' useSafeAccentFn share
            inkProbes: q("[data-ink-probe]").length,
        };
    });
    await ctx.close();
}
await browser.close();
console.log(JSON.stringify(out, null, 2));

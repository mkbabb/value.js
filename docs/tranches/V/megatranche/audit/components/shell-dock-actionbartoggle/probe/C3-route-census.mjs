// route census of the AX-exposed hidden Tools button + geometry
import { chromium } from "playwright";
const BASE = "http://localhost:9000";
const ROUTES = [
    "/#/", "/#/palettes", "/#/browse", "/#/extract", "/#/mix", "/#/generate",
    "/#/gradient", "/#/atmosphere", "/#/blob", "/#/admin/users", "/#/does-not-exist",
];
const b = await chromium.launch({
    args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});

async function census(viewport, label) {
    const page = await b.newPage({ viewport });
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("Accessibility.enable");
    const rows = [];
    for (const route of ROUTES) {
        await page.goto(BASE + route, { waitUntil: "load" });
        await page.waitForSelector(".glass-dock", { timeout: 20000 }).catch(() => {});
        await page.waitForTimeout(2600);
        const c = page.locator(".glass-dock.collapsed");
        if (await c.count()) { await c.click().catch(() => {}); await page.waitForTimeout(700); }
        const dom = await page.evaluate(() => {
            const s = document.querySelector(".action-bar-toggle-slot");
            const btn = document.querySelector(".dock-tools-btn");
            if (!btn) return { present: false };
            const r = btn.getBoundingClientRect();
            return {
                present: true,
                slotClass: s?.className,
                vis: !!s?.classList.contains("is-visible"),
                w: +r.width.toFixed(1),
                h: +r.height.toFixed(1),
                tabidx: btn.getAttribute("tabindex"),
                inertAnc: !!btn.closest("[inert]"),
                ariaHidAnc: !!btn.closest('[aria-hidden="true"]'),
            };
        });
        const { nodes } = await cdp.send("Accessibility.getFullAXTree");
        const ax = nodes.filter((n) => (n.name?.value ?? "") === "Toggle action bar" && !n.ignored).length;
        rows.push({ route, ...dom, axExposed: ax });
    }
    await page.close();
    console.log("### CENSUS " + label);
    console.log(JSON.stringify(rows, null, 1));
}

await census({ width: 1440, height: 900 }, "desktop-1440");
await census({ width: 390, height: 844 }, "mobile-390");
await b.close();

// PaletteCardMenu — CHALLENGE-C pass 3, probe C (mobile geometry)
// Decides:
//  C1  at 390x844 does the w-48 menu + the unsized Export submenu fit?
//      (the submenu is the widest surface in the demo: "CSS Custom Properties")
//  C2  does either surface overflow the viewport horizontally, or occlude the
//      parent menu it descends from?
//  C3  touch: can a touch user reach the submenu AT ALL (pass-2 C2-2) and, if
//      not, is there any other affordance on the item that says so?
import { chromium, devices } from "playwright";
import { writeFileSync } from "node:fs";

const OUT = {};
const log = (k, v) => { OUT[k] = v; console.log("::" + k, JSON.stringify(v, null, 1)); };

const NOW = new Date().toISOString();
const SEED = {
    version: 1,
    palettes: Array.from({ length: 4 }, (_, i) => ({
        id: `seed${i}`, name: `Probe Palette ${i}`, slug: `probe-${i}`, isLocal: true,
        createdAt: NOW, updatedAt: NOW,
        colors: [{ css: "#ff0055", position: 0 }, { css: "#00ddaa", position: 1 }],
    })),
};

const browser = await chromium.launch();
const ctx = await browser.newContext({
    ...devices["iPhone 14"],
    isMobile: true, hasTouch: true,
});
await ctx.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)), SEED);
const page = await ctx.newPage();
const errs = [];
page.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));

await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
log("C0_viewport", await page.evaluate(() => ({ w: innerWidth, h: innerHeight, dpr: devicePixelRatio })));

const geom = () => page.evaluate(() => {
    const menus = Array.from(document.querySelectorAll('[role="menu"]')).map((m) => {
        const r = m.getBoundingClientRect();
        return {
            id: m.id, side: m.dataset.side, align: m.dataset.align,
            x: +r.x.toFixed(1), y: +r.y.toFixed(1),
            w: +r.width.toFixed(1), h: +r.height.toFixed(1),
            right: +r.right.toFixed(1), bottom: +r.bottom.toFixed(1),
            overflowsRight: r.right > innerWidth + 0.5,
            overflowsLeft: r.left < -0.5,
            overflowsBottom: r.bottom > innerHeight + 0.5,
            items: Array.from(m.querySelectorAll('[role="menuitem"]')).map((i) => {
                const ir = i.getBoundingClientRect();
                return { t: (i.textContent || "").trim().replace(/\s+/g, " ").slice(0, 26),
                         w: Math.round(ir.width), h: Math.round(ir.height) };
            }),
        };
    });
    let overlap = null;
    if (menus.length === 2) {
        const [a, b] = menus;
        const ox = Math.max(0, Math.min(a.right, b.right) - Math.max(a.x, b.x));
        const oy = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.y, b.y));
        overlap = { xPx: +ox.toFixed(1), yPx: +oy.toFixed(1), area: +(ox * oy).toFixed(0) };
    }
    return {
        menus, overlap,
        docScrollW: document.documentElement.scrollWidth,
        innerW: innerWidth,
        horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
    };
});

// open the card menu by tap
await page.locator('[aria-label="Palette menu"]').first().tap();
await page.waitForTimeout(600);
log("C1_menuOnly", await geom());
await page.screenshot({ path: new URL("./mobile-menu.png", import.meta.url).pathname });

// C3: TAP the Export sub-trigger — pointer path
const before = await page.evaluate(() => document.querySelectorAll('[role="menu"]').length);
await page.getByRole("menuitem", { name: /Export/ }).tap();
await page.waitForTimeout(700);
const after = await page.evaluate(() => document.querySelectorAll('[role="menu"]').length);
log("C3_touchTapOnExport", { menusBefore: before, menusAfter: after,
    subState: await page.evaluate(() => {
        const el = Array.from(document.querySelectorAll('[role="menuitem"]')).find((e) => /Export/.test(e.textContent || ""));
        return { ariaExpanded: el?.getAttribute("aria-expanded"), dataState: el?.getAttribute("data-state"),
                 hasChevronAffordance: !!el?.querySelector("svg:last-child"),
                 childSvgCount: el?.querySelectorAll("svg").length ?? 0 };
    }) });

// open the submenu the only way that works on this build: keyboard
await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('[role="menuitem"]')).find((e) => /Export/.test(e.textContent || ""));
    el.focus();
});
await page.keyboard.press("ArrowRight");
await page.waitForTimeout(700);
log("C2_menuPlusSubmenu", await geom());
await page.screenshot({ path: new URL("./mobile-submenu.png", import.meta.url).pathname });

log("errs", errs);
writeFileSync(new URL("./pcm-p3-c-results.json", import.meta.url), JSON.stringify(OUT, null, 2));
await browser.close();

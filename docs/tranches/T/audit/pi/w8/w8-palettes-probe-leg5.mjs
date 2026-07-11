/**
 * T.W8 · pass 4 — LEG 5 RESUME (the dialog/detail states). The first run's
 * pane locator used `exact:true` on the heading; the POPULATED header grows
 * the count Badge INSIDE the heading's accessible name ("My Palettes 2"),
 * so the pane never matched. This resume matches on /^My Palettes/ and also
 * RECORDS that name-growth fact for the pass record.
 */
import { chromium } from "@playwright/test";
import { appendFileSync } from "node:fs";

const BASE = "http://localhost:8630";
const OUT = "docs/tranches/T/audit/pi/w8/palettes";
const browser = await chromium.launch({ headless: false, channel: "chromium" });
const report = [];
const log = (s) => {
    console.log(s);
    report.push(s);
};

const NOW = "2026-07-05T00:00:00.000Z";
const SEED_STORE = JSON.stringify({
    version: 1,
    palettes: [
        {
            id: "seed-1",
            name: "Harvest Table",
            slug: "harvest-table",
            colors: [
                { css: "oklch(0.62 0.19 25)", position: 0 },
                { css: "oklch(0.7 0.14 85)", position: 1 },
                { css: "oklch(0.55 0.12 155)", position: 2 },
            ],
            createdAt: NOW,
            updatedAt: NOW,
            isLocal: true,
        },
        {
            id: "seed-2",
            name: "Night Water",
            slug: "night-water",
            colors: [
                { css: "oklch(0.45 0.1 240)", position: 0 },
                { css: "oklch(0.3 0.06 260)", position: 1 },
                { css: "oklch(0.72 0.05 220)", position: 2 },
                { css: "oklch(0.85 0.03 200)", position: 3 },
            ],
            createdAt: NOW,
            updatedAt: NOW,
            isLocal: true,
        },
    ],
});

const REST_PALETTES = (url) =>
    !/\/(@fs|@id|@vite|node_modules)\//.test(url.pathname) &&
    !/\.\w+$/.test(url.pathname) &&
    /(^|\/)palettes(\/|$)/.test(url.pathname);

for (const scheme of ["light", "dark"]) {
    const tag = `1440-${scheme}`;
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 2,
        colorScheme: scheme,
        baseURL: BASE,
    });
    await ctx.addInitScript((store) => {
        window.localStorage.setItem("color-palettes", store);
    }, SEED_STORE);
    const page = await ctx.newPage();
    const errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(String(e)));
    await page.route(REST_PALETTES, (route) =>
        route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ data: [], total: 0, limit: 50, offset: 0 }),
        }),
    );
    await page.goto("/#/palettes");
    await page.waitForTimeout(3400);

    const mp = page
        .getByRole("main", { name: "Color tool panes" })
        .locator('[data-slot="card"]')
        .filter({ has: page.getByRole("heading", { name: /^My Palettes/ }) })
        .filter({ visible: true })
        .first();

    const headingName = await page
        .getByRole("heading", { name: /^My Palettes/ })
        .first()
        .evaluate((el) => el.textContent?.trim());
    const cards = await mp.getByRole("article").count();
    const trio = await mp
        .locator('[data-slot="empty-state-trio"]')
        .filter({ visible: true })
        .count();
    const fillers = await mp
        .locator('[data-slot="shadow-palette"]')
        .filter({ visible: true })
        .count();
    log(
        `[${tag}] mypalettes-populated  heading="${headingName}" cards=${cards} trio=${trio} fillers=${fillers}`,
    );
    // card title voice probe (T-15/O-10d: display voice on the card name)
    const nameVoice = await mp
        .getByRole("article", { name: "Palette: Harvest Table" })
        .first()
        .evaluate((el) => {
            const name = Array.from(el.querySelectorAll("*")).find(
                (n) => n.textContent?.trim() === "Harvest Table" && n.children.length === 0,
            );
            if (!name) return null;
            const cs = getComputedStyle(name);
            return { family: cs.fontFamily.split(",")[0], size: cs.fontSize, weight: cs.fontWeight, style: cs.fontStyle };
        });
    log(`[${tag}]   card name voice: ${JSON.stringify(nameVoice)}`);
    await page.screenshot({ path: `${OUT}/${tag}-mypalettes-populated.png` });

    // expanded card detail
    const card = mp.getByRole("article", { name: "Palette: Harvest Table" }).first();
    await card.click();
    await page.waitForTimeout(900);
    const expandedSwatches = await card.locator('[data-variant]').count();
    log(`[${tag}] card-expanded  dot-count(any variant)=${expandedSwatches}`);
    await page.screenshot({ path: `${OUT}/${tag}-card-expanded.png` });

    // card menu (detail actions)
    const menuBtn = card.getByRole("button", { name: "Palette menu" }).first();
    if (await menuBtn.count()) {
        await menuBtn.click();
        await page.waitForTimeout(600);
        const menu = page.getByRole("menu").filter({ visible: true });
        const items = await menu.getByRole("menuitem").allTextContents().catch(() => []);
        log(`[${tag}] card-menu open  items=[${items.join(" · ")}]`);
        // menu material read
        if (await menu.count()) {
            const mat = await menu.first().evaluate((el) => {
                const cs = getComputedStyle(el);
                return { bg: cs.backgroundColor, blur: cs.backdropFilter, radius: cs.borderTopLeftRadius };
            });
            log(`[${tag}]   menu mat: ${JSON.stringify(mat)}`);
        }
        await page.screenshot({ path: `${OUT}/${tag}-card-menu.png` });
        await page.keyboard.press("Escape");
        await page.waitForTimeout(400);
    } else {
        log(`[${tag}]   card menu trigger NOT FOUND (recorded)`);
    }

    // delete-all ConfirmDialog
    const del = mp.getByRole("button", { name: "Delete all saved palettes" });
    if (await del.count()) {
        await del.click();
        await page.waitForTimeout(700);
        const dlg = page
            .getByRole("alertdialog")
            .or(page.getByRole("dialog"))
            .filter({ visible: true });
        const dlgCount = await dlg.count();
        let dlgProbe = null;
        if (dlgCount) {
            dlgProbe = await dlg.first().evaluate((el) => {
                const cs = getComputedStyle(el);
                return {
                    bg: cs.backgroundColor,
                    blur: cs.backdropFilter,
                    radius: cs.borderTopLeftRadius,
                    title: el.querySelector("h2,h3,[data-slot=dialog-title]")?.textContent?.trim(),
                };
            });
        }
        log(`[${tag}] delete-all dialog present=${dlgCount} ${dlgProbe ? JSON.stringify(dlgProbe) : ""}`);
        await page.screenshot({ path: `${OUT}/${tag}-deleteall-dialog.png` });
        await page.keyboard.press("Escape");
        await page.waitForTimeout(300);
    } else {
        log(`[${tag}] delete-all trigger NOT FOUND (recorded)`);
    }
    log(`[${tag}] console errors: ${errors.length}${errors.length ? " — " + errors.join(" · ") : ""}`);
    await ctx.close();
}

/* trio zoom (the package's dashes witness) */
{
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 2,
        colorScheme: "light",
        baseURL: BASE,
    });
    const page = await ctx.newPage();
    await page.route(REST_PALETTES, (route) =>
        route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ data: [], total: 0, limit: 50, offset: 0 }),
        }),
    );
    await page.goto("/#/palettes");
    await page.waitForTimeout(3400);
    const trio = page
        .locator('[data-slot="empty-state-trio"]')
        .filter({ visible: true })
        .first();
    const box = await trio.boundingBox();
    if (box)
        await page.screenshot({
            path: `${OUT}/1440-light-trio-zoom.png`,
            clip: {
                x: Math.max(0, box.x - 40),
                y: Math.max(0, box.y - 24),
                width: box.width + 80,
                height: box.height + 100,
            },
        });
    // the dash witness: stroke-dasharray on the ghost silhouette
    const dash = await trio.evaluate((el) => {
        const stroke = el.querySelector(".watercolor-ghost-stroke");
        if (!stroke) return null;
        const cs = getComputedStyle(stroke);
        return { dasharray: cs.strokeDasharray, stroke: cs.stroke, tag: stroke.tagName };
    });
    console.log(`[1440-light] trio dash witness: ${JSON.stringify(dash)}`);
    report.push(`[1440-light] trio dash witness: ${JSON.stringify(dash)}`);
    await ctx.close();
}

await browser.close();
appendFileSync(
    "docs/tranches/T/audit/pi/w8/w8-palettes-probe-log.txt",
    "\n=== LEG 5 RESUME ===\n" + report.join("\n") + "\n",
);
console.log("DONE leg5");

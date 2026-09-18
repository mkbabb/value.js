import { chromium } from "playwright";
import fs from "node:fs";

const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/PaletteCardMenu";
fs.mkdirSync(OUT + "/evidence", { recursive: true });

const now = "2026-07-27T00:00:00.000Z";
const mk = (name, slug, colors, extra = {}) => ({
    id: slug, name, slug,
    colors: colors.map((css, i) => ({ css, position: i })),
    createdAt: now, updatedAt: now, isLocal: true, ...extra,
});
const SEED = { version: 1, palettes: [
    mk("Muted Terracotta and Deep Sea Foam Study", "pal-saved-1",
       ["#c96f4a", "#7fb7a3", "#2e4a52", "#e8d5b7", "#8a5a44"],
       { versionCount: 4, tier: "featured" }),
    mk("Temp", "gen-temp-1", ["#123456", "#abcdef"]),
] };

const dump = async (page) => {
    return await page.evaluate(() => {
        const cs = (el, props) =>
            Object.fromEntries(props.map((p) => [p, getComputedStyle(el).getPropertyValue(p)]));
        const content = document.querySelector('[data-slot="dropdown-menu-content"]');
        if (!content) return { error: "no menu content in DOM" };
        const r = content.getBoundingClientRect();
        const items = [...content.querySelectorAll('[data-slot="dropdown-menu-item"],[data-slot="dropdown-menu-sub-trigger"]')].map(
            (el) => ({
                text: el.textContent.replace(/\s+/g, " ").trim(),
                slot: el.dataset.slot,
                disabled: el.getAttribute("data-disabled") !== null,
                ariaDisabled: el.getAttribute("aria-disabled"),
                tabindex: el.getAttribute("tabindex"),
                role: el.getAttribute("role"),
                rect: (({ x, y, width, height }) => ({ x: +x.toFixed(1), y: +y.toFixed(1), w: +width.toFixed(1), h: +height.toFixed(1) }))(el.getBoundingClientRect()),
                ...cs(el, ["font-size", "font-family", "cursor", "gap", "column-gap", "padding-inline-start", "opacity", "color"]),
                trailing: [...el.querySelectorAll("span")]
                    .filter((s) => s.children.length === 0 && s.textContent.trim())
                    .map((s) => ({
                        text: s.textContent.trim(),
                        cls: s.className,
                        ...cs(s, ["font-size", "font-family", "font-variant-caps", "opacity", "letter-spacing", "margin-left", "margin-right", "margin-inline-start", "color"]),
                        rect: (({ x, width }) => ({ x: +x.toFixed(1), w: +width.toFixed(1) }))(s.getBoundingClientRect()),
                    })),
            }),
        );
        const label = content.querySelector('[data-slot="dropdown-menu-label"]');
        return {
            contentRect: { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) },
            contentStyles: cs(content, ["font-size", "width", "min-width", "max-height", "overflow-y", "border-radius", "background-color", "z-index", "animation-name", "animation-duration", "transition-property", "transition-duration"]),
            docScrollW: document.documentElement.scrollWidth,
            innerW: window.innerWidth,
            label: label
                ? {
                      text: label.textContent.trim(),
                      ...cs(label, ["font-size", "font-family", "font-weight", "line-height", "max-width", "overflow", "text-overflow", "padding-inline"]),
                      scrollW: label.scrollWidth,
                      clientW: label.clientWidth,
                      rect: (({ width }) => ({ w: +width.toFixed(1) }))(label.getBoundingClientRect()),
                  }
                : null,
            separators: [...content.querySelectorAll('[data-slot="dropdown-menu-separator"]')].map((s) => ({
                y: +s.getBoundingClientRect().y.toFixed(1),
            })),
            items,
        };
    });
};

const openMenu = async (page) => {
    const btn = page.locator('button[aria-label="Palette menu"]').first();
    await btn.click();
    await page.waitForSelector('[data-slot="dropdown-menu-content"]', { timeout: 5000 });
    await page.waitForTimeout(500);
};

const run = async () => {
    const browser = await chromium.launch();
    const results = {};

    for (const [tag, vp, scheme] of [
        ["desktop-light", { width: 1440, height: 1000 }, "light"],
        ["mobile-light", { width: 390, height: 844 }, "light"],
        ["desktop-dark", { width: 1440, height: 1000 }, "dark"],
    ]) {
        const ctx = await browser.newContext({ viewport: vp, colorScheme: scheme, deviceScaleFactor: 2 });
        const page = await ctx.newPage();
        await page.addInitScript((seed) => {
            localStorage.setItem("color-palettes", JSON.stringify(seed)); localStorage.setItem("value-onboarding-seen","1");
        }, SEED);
        await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
        await page.waitForTimeout(2500);
        try {
            await openMenu(page);
            results[tag] = await dump(page);
            await page.screenshot({ path: `${OUT}/evidence/${tag}-menu-open.png`, fullPage: false });
            const sub = page.locator('[data-slot="dropdown-menu-sub-trigger"]').first();
            await sub.hover();
            await page.waitForTimeout(700);
            const subInfo = await page.evaluate(() => {
                const sc = document.querySelector('[data-slot="dropdown-menu-sub-content"]');
                if (!sc) return { error: "no sub-content" };
                const r = sc.getBoundingClientRect();
                const items = [...sc.querySelectorAll('[data-slot="dropdown-menu-item"]')].map((el) => ({
                    text: el.textContent.trim(),
                    fontSize: getComputedStyle(el).fontSize,
                    fontFamily: getComputedStyle(el).fontFamily.split(",")[0],
                    w: +el.getBoundingClientRect().width.toFixed(1),
                    scrollW: el.scrollWidth,
                    clientW: el.clientWidth,
                }));
                return {
                    rect: { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) },
                    right: +(r.x + r.width).toFixed(1),
                    innerW: window.innerWidth,
                    innerH: window.innerHeight,
                    docScrollW: document.documentElement.scrollWidth,
                    items,
                };
            });
            results[tag + "-submenu"] = subInfo;
            await page.screenshot({ path: `${OUT}/evidence/${tag}-submenu-open.png` });
        } catch (e) {
            results[tag] = { error: String(e).slice(0, 400) };
        }
        await ctx.close();
    }

    {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: "light", deviceScaleFactor: 2 });
        const page = await ctx.newPage();
        await page.addInitScript((seed) => { localStorage.setItem("color-palettes", JSON.stringify(seed)); localStorage.setItem("value-onboarding-seen","1"); }, SEED);
        await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
        await page.evaluate(() => document.documentElement.setAttribute("dir", "rtl"));
        await page.waitForTimeout(2500);
        try {
            await openMenu(page);
            results["rtl-desktop"] = await dump(page);
            await page.screenshot({ path: `${OUT}/evidence/rtl-desktop-menu-open.png` });
        } catch (e) {
            results["rtl-desktop"] = { error: String(e).slice(0, 400) };
        }
        await ctx.close();
    }

    {
        const ctx = await browser.newContext({
            viewport: { width: 1440, height: 1000 },
            colorScheme: "light",
            forcedColors: "active",
            reducedMotion: "reduce",
            deviceScaleFactor: 2,
        });
        const page = await ctx.newPage();
        await page.addInitScript((seed) => { localStorage.setItem("color-palettes", JSON.stringify(seed)); localStorage.setItem("value-onboarding-seen","1"); }, SEED);
        await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
        await page.waitForTimeout(2500);
        try {
            await openMenu(page);
            results["forced-colors"] = await dump(page);
            await page.screenshot({ path: `${OUT}/evidence/forced-colors-menu-open.png` });
        } catch (e) {
            results["forced-colors"] = { error: String(e).slice(0, 400) };
        }
        await ctx.close();
    }

    {
        const ctx = await browser.newContext({ viewport: { width: 720, height: 500 }, colorScheme: "light", deviceScaleFactor: 2 });
        const page = await ctx.newPage();
        await page.addInitScript((seed) => { localStorage.setItem("color-palettes", JSON.stringify(seed)); localStorage.setItem("value-onboarding-seen","1"); }, SEED);
        await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
        await page.waitForTimeout(2500);
        try {
            await openMenu(page);
            const d = await dump(page);
            results["zoom200"] = {
                contentRect: d.contentRect,
                contentStyles: d.contentStyles,
                innerH: 500,
                itemCount: d.items?.length,
                overflowsViewport: d.contentRect ? d.contentRect.y + d.contentRect.h > 500 : null,
            };
            await page.screenshot({ path: `${OUT}/evidence/zoom200-menu-open.png` });
        } catch (e) {
            results["zoom200"] = { error: String(e).slice(0, 400) };
        }
        await ctx.close();
    }

    await browser.close();
    fs.writeFileSync(OUT + "/probe-D-results.json", JSON.stringify(results, null, 2));
    console.log(JSON.stringify(results, null, 2));
};

run().catch((e) => {
    console.error(e);
    process.exit(1);
});

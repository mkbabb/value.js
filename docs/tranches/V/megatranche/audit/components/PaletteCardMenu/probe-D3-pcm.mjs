import { chromium } from "playwright";
import fs from "node:fs";

const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/PaletteCardMenu";
const now = "2026-07-27T00:00:00.000Z";
const mk = (name, slug, colors, extra = {}) => ({
    id: slug, name, slug, colors: colors.map((css, i) => ({ css, position: i })),
    createdAt: now, updatedAt: now, isLocal: true, ...extra,
});
const SEED = { version: 1, palettes: [
    mk("Muted Terracotta and Deep Sea Foam Study", "pal-saved-1",
       ["#c96f4a", "#7fb7a3", "#2e4a52", "#e8d5b7", "#8a5a44"], { versionCount: 4, tier: "featured" }),
    mk("Temp", "gen-temp-1", ["#123456", "#abcdef"]),
] };

const run = async () => {
    const browser = await chromium.launch();
    const out = {};
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.addInitScript((s) => { localStorage.setItem("color-palettes", JSON.stringify(s)); localStorage.setItem("value-onboarding-seen", "1"); }, SEED);
    await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
    await page.waitForTimeout(2200);
    await page.locator('button[aria-label="Palette menu"]').first().click();
    await page.waitForSelector('[data-slot="dropdown-menu-content"]');
    await page.waitForTimeout(400);

    out.destructiveCascade = await page.evaluate(() => {
        const items = [...document.querySelectorAll('[data-slot="dropdown-menu-item"]')];
        const del = items.find((e) => e.textContent.trim() === "Delete");
        const rs = getComputedStyle(document.documentElement);
        const before = getComputedStyle(del).color;
        const hasDestructive = del.classList.contains("text-destructive");
        del.classList.remove("dropdown-menu__item");
        const afterRemovingProducer = getComputedStyle(del).color;
        del.classList.add("dropdown-menu__item");
        // stylesheet order check
        const sheets = [...document.styleSheets].map((s) => s.href || "(inline)");
        return {
            deleteClassList: del.className,
            hasDestructiveClass: hasDestructive,
            colorWithProducerClass: before,
            colorWithoutProducerClass: afterRemovingProducer,
            "--destructive": rs.getPropertyValue("--destructive"),
            "--foreground": rs.getPropertyValue("--foreground"),
            publishColor: getComputedStyle(items[0]).color,
            sheetCount: sheets.length,
        };
    });

    // apiOffline gate: what does the component actually see?
    out.availabilityState = await page.evaluate(() => {
        const chip = [...document.querySelectorAll("*")].find((e) =>
            e.children.length === 0 && /misconfigured/i.test(e.textContent || ""));
        return { chipText: chip ? chip.textContent.trim() : null };
    });

    // concentric radius + shadow language
    out.material = await page.evaluate(() => {
        const c = document.querySelector('[data-slot="dropdown-menu-content"]');
        const i = document.querySelector('[data-slot="dropdown-menu-item"]');
        const card = document.querySelector('[role="article"]');
        const g = (e) => getComputedStyle(e);
        return {
            contentRadius: g(c).borderRadius, contentPadding: g(c).padding,
            itemRadius: g(i).borderRadius,
            concentricIdeal: parseFloat(g(c).borderRadius) - parseFloat(g(c).paddingLeft),
            cardRadius: g(card).borderRadius,
            cardShadowKind: g(card).boxShadow.includes("0px 0px") ? "hard-offset" : "?",
            cardShadow: g(card).boxShadow.slice(0, 120),
            menuShadow: g(c).boxShadow.slice(0, 200),
        };
    });

    // measured ink contrast of the menu label vs its composited backdrop
    out.contrast = await page.evaluate(() => {
        const lab = document.querySelector('[data-slot="dropdown-menu-label"]');
        const c = getComputedStyle(lab);
        return { labelColor: c.color, labelOpacity: c.opacity, contentBg: getComputedStyle(lab.closest('[data-slot="dropdown-menu-content"]')).backgroundColor };
    });

    // Rename: click path (not keyboard) — does the input take focus?
    out.renameClick = await page.evaluate(async () => {
        const items = [...document.querySelectorAll('[data-slot="dropdown-menu-item"]')];
        const ren = items.find((e) => e.textContent.trim() === "Rename");
        ren.click();
        await new Promise((r) => setTimeout(r, 600));
        const input = document.querySelector('[role="article"] input');
        return {
            menuStillOpen: !!document.querySelector('[data-slot="dropdown-menu-content"]'),
            inputPresent: !!input,
            inputFocused: document.activeElement === input,
            activeElement: document.activeElement?.tagName + "/" + (document.activeElement?.getAttribute("aria-label") || "").slice(0, 40),
        };
    });

    await ctx.close();
    await browser.close();
    fs.writeFileSync(OUT + "/probe-D3-results.json", JSON.stringify(out, null, 2));
    console.log(JSON.stringify(out, null, 2));
};
run().catch((e) => { console.error(e); process.exit(1); });

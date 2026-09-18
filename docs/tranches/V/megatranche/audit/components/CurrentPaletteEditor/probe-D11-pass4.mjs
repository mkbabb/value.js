// CHALLENGE-D pass 4 — probe D11 (D10 re-run with the correct store schema
// `{version:1, palettes:[...]}` — D10's seed was rejected by
// `usePaletteStore.ts:24-27`, which returns `defaultStore` when `version` is
// not a number, so D10's P2/P3 ran against an empty library).
//   P2  commit while a search filter is active
//   P3  the three renderings of one palette in one frame
//   P5  the ghost-silhouette collision: add-slot vs EmptyState trio, measured
// Read-only.
import { chromium } from "playwright";
import { writeFileSync } from "fs";

const HERE = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/CurrentPaletteEditor";
const OUT = `${HERE}/frames-D10`;
const BASE = "http://localhost:9000/";

const lab = (i, n) =>
    `lab(${(30 + (55 * i) / n).toFixed(1)}% ${(-70 + (150 * i) / n).toFixed(1)} ${(80 - (150 * i) / n).toFixed(1)})`;
const draft = (n) => Array.from({ length: n }, (_, i) => lab(i, n));

async function seeded(browser, { viewport, colors, palettes = [], dsf = 2 }) {
    const ctx = await browser.newContext({ viewport, deviceScaleFactor: dsf });
    const page = await ctx.newPage();
    await page.addInitScript(
        (s) => {
            localStorage.setItem(
                "color-picker",
                JSON.stringify({ inputColor: s.colors[0] ?? "lab(60% 20 20)", savedColors: s.colors }),
            );
            localStorage.setItem("color-palettes", JSON.stringify({ version: 1, palettes: s.palettes }));
        },
        { colors, palettes },
    );
    await page.goto(BASE + "#/palettes", { waitUntil: "load" });
    await page.waitForTimeout(2800);
    return { ctx, page };
}

const P = (n, cols) => ({
    id: `seed-${n}`,
    slug: `seed-${n}`,
    name: n,
    colors: cols.map((css, i) => ({ css, position: i })),
    createdAt: Date.now(),
    isLocal: true,
});

const browser = await chromium.launch();
const results = {};

// ── P2 · commit under an active, non-matching filter ───────────────────────────
{
    const { ctx, page } = await seeded(browser, {
        viewport: { width: 1440, height: 1200 },
        colors: draft(4),
        palettes: [P("Zebra", draft(3))],
    });
    const before = await page.evaluate(() => ({
        cardCount: document.querySelectorAll('[role="article"], article').length,
        emptyVisible: !!document.querySelector('[data-slot="empty-state-trio"]'),
        headerBadge: document.querySelector(".sr-only")?.textContent.trim(),
    }));

    await page.locator('input[placeholder="Search your palettes..."]').fill("qqqzzz");
    await page.waitForTimeout(600);
    const filtered = await page.evaluate(() => ({
        cardCount: document.querySelectorAll('[role="article"], article').length,
        emptyText: document.querySelector('[role="status"]')?.textContent.replace(/\s+/g, " ").trim(),
        headerBadge: [...document.querySelectorAll(".sr-only")].map((e) => e.textContent.trim()).join("|"),
    }));
    await page.screenshot({ path: `${OUT}/p2b-filter-no-results.png` });

    await page.locator(".dashed-well input").fill("Aurora Draft");
    await page.locator(".dashed-well button").last().click();
    await page.waitForTimeout(1000);
    const after = await page.evaluate(() => {
        const store = JSON.parse(localStorage.getItem("color-palettes") ?? "{}");
        return {
            storedNames: (store.palettes ?? []).map((p) => p.name),
            cardCount: document.querySelectorAll('[role="article"], article').length,
            emptyText: document.querySelector('[role="status"]')?.textContent.replace(/\s+/g, " ").trim(),
            headerBadge: [...document.querySelectorAll(".sr-only")].map((e) => e.textContent.trim()).join("|"),
            wellHeader: document.querySelector(".dashed-well .text-small")?.textContent.trim(),
            activeElement:
                document.activeElement?.tagName +
                ":" +
                (document.activeElement?.getAttribute("aria-label") ?? document.activeElement?.placeholder ?? ""),
            searchStillActive: document.querySelector('input[placeholder="Search your palettes..."]')?.value,
        };
    });
    await page.screenshot({ path: `${OUT}/p2b-after-save-under-filter.png` });
    results.P2 = { before, filtered, after };
    await ctx.close();
}

// ── P3 · three renderings of one palette in one frame ──────────────────────────
{
    const cols = draft(5);
    const { ctx, page } = await seeded(browser, {
        viewport: { width: 1440, height: 1200 },
        colors: cols,
        palettes: [P("Same Five", cols)],
    });
    const collapsed = await page.evaluate(() => {
        const well = document.querySelector(".dashed-well");
        const wd = well?.querySelector(".watercolor-swatch");
        const strip = document.querySelector('[role="presentation"][aria-hidden="true"]');
        const seg = strip?.firstElementChild;
        const box = (e) =>
            e ? { w: +e.getBoundingClientRect().width.toFixed(1), h: +e.getBoundingClientRect().height.toFixed(1) } : null;
        return {
            draftDot: box(wd),
            draftDotRadius: wd ? getComputedStyle(wd).borderRadius : null,
            draftDotFilter: wd ? getComputedStyle(wd).filter : null,
            strip: box(strip),
            stripSeg: box(seg),
            stripSegRadius: seg ? getComputedStyle(seg).borderRadius : null,
            stripSegFilter: seg ? getComputedStyle(seg).filter : null,
            cardCount: document.querySelectorAll('[role="article"], article').length,
        };
    });
    // expand the saved card by clicking its identity region
    await page.getByText("Same Five", { exact: false }).first().click({ force: true }).catch(() => {});
    await page.waitForTimeout(900);
    const expanded = await page.evaluate(() => {
        const well = document.querySelector(".dashed-well");
        const inWell = new Set([...(well?.querySelectorAll(".watercolor-swatch") ?? [])]);
        const trio = new Set([...document.querySelectorAll('[data-slot="empty-state-trio"] .watercolor-swatch')]);
        const cardDots = [...document.querySelectorAll(".watercolor-swatch")].filter(
            (d) => !inWell.has(d) && !trio.has(d),
        );
        const box = (e) =>
            e ? { w: +e.getBoundingClientRect().width.toFixed(1), h: +e.getBoundingClientRect().height.toFixed(1) } : null;
        return {
            wellDots: inWell.size,
            cardDots: cardDots.length,
            cardDot: box(cardDots[0]),
            stripStillPresent: !!document.querySelector('[role="presentation"][aria-hidden="true"]'),
            stripBox: box(document.querySelector('[role="presentation"][aria-hidden="true"]')),
        };
    });
    await page.screenshot({ path: `${OUT}/p3b-three-renderings.png`, fullPage: true });
    results.P3 = { collapsed, expanded };
    await ctx.close();
}

// ── P5 · the ghost-silhouette collision, measured in one viewport ──────────────
{
    const { ctx, page } = await seeded(browser, {
        viewport: { width: 1440, height: 1000 },
        colors: [],
        palettes: [],
    });
    const ghosts = await page.evaluate(() => {
        const box = (e) => {
            const r = e.getBoundingClientRect();
            return { w: +r.width.toFixed(1), h: +r.height.toFixed(1), x: +r.x.toFixed(1), y: +r.y.toFixed(1) };
        };
        const add = document.querySelector(".add-slot-ghost");
        const trio = [...document.querySelectorAll('[data-slot="empty-state-trio"] .watercolor-swatch')];
        const cls = (e) => (e ? getComputedStyle(e) : null);
        return {
            addSlot: add
                ? {
                      ...box(add),
                      classList: add.className,
                      variant: add.getAttribute("data-variant") ?? null,
                      strokeColor: cls(add).borderColor,
                      opacity: cls(add).opacity,
                      ariaLabel: add.getAttribute("aria-label"),
                      role: add.getAttribute("role"),
                      tag: add.tagName,
                  }
                : null,
            trio: trio.map((t) => ({ ...box(t), opacity: cls(t).opacity, cls: t.className })),
            verticalGap:
                add && trio[1] ? +(trio[1].getBoundingClientRect().top - add.getBoundingClientRect().bottom).toFixed(1) : null,
            bothVisibleInViewport:
                !!add && !!trio[1] && trio[1].getBoundingClientRect().bottom < window.innerHeight,
            wellIsCardDescendant: !!document.querySelector(".dashed-well")?.closest(".card, [class*='glass-resting']"),
            wellAncestorClasses: (() => {
                const a = document.querySelector(".dashed-well")?.closest(".card, [class*='glass-resting']");
                return a ? a.className.slice(0, 160) : null;
            })(),
        };
    });
    await page.screenshot({ path: `${OUT}/p5-ghost-collision-1440.png` });
    results.P5 = ghosts;
    await ctx.close();
}

await browser.close();
writeFileSync(`${HERE}/probe-D11-pass4.json`, JSON.stringify(results, null, 1));
console.log(JSON.stringify(results, null, 1));

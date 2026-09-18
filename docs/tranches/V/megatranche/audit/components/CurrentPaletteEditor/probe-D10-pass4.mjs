// CHALLENGE-D pass 4 — probe D10.
// Targets NOT covered by passes 1–3:
//   P1  cardinality — the domain's 1–50 bound has no representation in the UI
//   P2  commit under an active search filter — the artifact can vanish on save
//   P3  three renderings of one palette on one screen (draft dot / strip / card dot)
//   P4  200% zoom
// Read-only. Writes only frames + JSON under this audit directory.
import { chromium } from "playwright";
import { writeFileSync } from "fs";

const HERE = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/CurrentPaletteEditor";
const OUT = `${HERE}/frames-D10`;
const BASE = "http://localhost:9000/";

const lab = (i, n) =>
    `lab(${(30 + (55 * i) / n).toFixed(1)}% ${(-70 + (150 * i) / n).toFixed(1)} ${(80 - (150 * i) / n).toFixed(1)})`;
const draft = (n) => Array.from({ length: n }, (_, i) => lab(i, n));

async function seeded(browser, { viewport, colors, palettes = [], dsf = 2, extra = {} }) {
    const ctx = await browser.newContext({ viewport, deviceScaleFactor: dsf, ...extra });
    const page = await ctx.newPage();
    await page.addInitScript(
        (s) => {
            localStorage.setItem(
                "color-picker",
                JSON.stringify({ inputColor: s.colors[0] ?? "lab(60% 20 20)", savedColors: s.colors }),
            );
            if (s.palettes.length)
                localStorage.setItem("color-palettes", JSON.stringify({ palettes: s.palettes }));
        },
        { colors, palettes },
    );
    await page.goto(BASE + "#/palettes", { waitUntil: "load" });
    await page.waitForTimeout(2800);
    return { ctx, page };
}

const measureWell = () => {
    const well = document.querySelector(".dashed-well");
    if (!well) return { found: false };
    const r = well.getBoundingClientRect();
    const dots = [...well.querySelectorAll(".watercolor-swatch")];
    const btns = [...well.querySelectorAll("button")];
    const txt = well.innerText.replace(/\s+/g, " ").trim();
    return {
        found: true,
        wellH: +r.height.toFixed(1),
        wellW: +r.width.toFixed(1),
        wellTop: +r.top.toFixed(1),
        wellBottom: +r.bottom.toFixed(1),
        dotCount: dots.length,
        dotBox: dots[0]
            ? {
                  w: +dots[0].getBoundingClientRect().width.toFixed(1),
                  h: +dots[0].getBoundingClientRect().height.toFixed(1),
              }
            : null,
        buttons: btns.map((b) => ({
            name: b.getAttribute("aria-label") || b.textContent.replace(/\s+/g, " ").trim() || "<<NONAME>>",
            disabled: b.disabled,
        })),
        wellText: txt.slice(0, 200),
        docH: document.documentElement.scrollHeight,
        vh: window.innerHeight,
    };
};

const browser = await chromium.launch();
const results = {};

// ── P1 · cardinality ───────────────────────────────────────────────────────────
for (const n of [1, 12, 50, 51, 80]) {
    const { ctx, page } = await seeded(browser, { viewport: { width: 1440, height: 900 }, colors: draft(n) });
    const m = await page.evaluate(measureWell);
    // does the well announce, cap, or resist anything at/over the contract bound?
    const guard = await page.evaluate(() => {
        const well = document.querySelector(".dashed-well");
        const add = well?.querySelector(".add-slot-ghost");
        return {
            addSlotPresent: !!add,
            addSlotAriaDisabled: add?.getAttribute("aria-disabled") ?? null,
            addSlotPointerEvents: add ? getComputedStyle(add).pointerEvents : null,
            countLine: well?.querySelector(".text-mono-small")?.textContent.trim() ?? null,
            anyOverLimitCopy: /\b(50|limit|max|maximum|too many)\b/i.test(well?.innerText ?? ""),
            saveBtnDisabled: (() => {
                const bs = [...(well?.querySelectorAll("button") ?? [])];
                return bs.length ? bs[bs.length - 1].disabled : null;
            })(),
        };
    });
    results[`P1_n${n}`] = { ...m, ...guard };
    if (n === 50 || n === 80 || n === 12)
        await page.screenshot({ path: `${OUT}/p1-n${n}-1440.png`, fullPage: false });
    await ctx.close();
}

// ── P2 · commit while a search filter is active ────────────────────────────────
{
    const existing = [
        {
            id: "seed-aaa",
            slug: "seed-aaa",
            name: "Zebra",
            colors: [
                { css: "lab(60% 20 20)", position: 0 },
                { css: "lab(40% -20 40)", position: 1 },
            ],
            createdAt: Date.now(),
        },
    ];
    const { ctx, page } = await seeded(browser, {
        viewport: { width: 1440, height: 1200 },
        colors: draft(4),
        palettes: existing,
    });

    const before = await page.evaluate(() => ({
        cards: document.querySelectorAll("article, [data-palette-card]").length,
        gridText: document.querySelector(".dashed-well")?.parentElement?.innerText.replace(/\s+/g, " ").slice(0, 300),
    }));

    // type a filter that matches nothing
    const search = page.locator('input[placeholder="Search your palettes..."]');
    await search.fill("qqqzzz");
    await page.waitForTimeout(500);
    const filtered = await page.evaluate(() => ({
        bodyText: document.body.innerText.replace(/\s+/g, " ").slice(0, 600),
    }));
    await page.screenshot({ path: `${OUT}/p2-filter-active.png` });

    // name the draft and commit
    const nameField = page.locator(".dashed-well input");
    await nameField.fill("Aurora Draft");
    await page.locator(".dashed-well button").last().click();
    await page.waitForTimeout(900);

    const after = await page.evaluate(() => {
        const store = JSON.parse(localStorage.getItem("color-palettes") ?? "{}");
        const well = document.querySelector(".dashed-well");
        return {
            storedPaletteNames: (store.palettes ?? []).map((p) => p.name),
            visibleBodyText: document.body.innerText.replace(/\s+/g, " ").slice(0, 600),
            wellStillHasSwatches: (well?.querySelectorAll(".watercolor-swatch") ?? []).length,
            liveRegions: [...document.querySelectorAll("[role=alert],[role=status],[aria-live]")].map((e) => ({
                role: e.getAttribute("role"),
                live: e.getAttribute("aria-live"),
                text: e.textContent.replace(/\s+/g, " ").trim().slice(0, 80),
            })),
            activeElement: document.activeElement?.tagName + ":" + (document.activeElement?.getAttribute("aria-label") ?? document.activeElement?.placeholder ?? ""),
        };
    });
    await page.screenshot({ path: `${OUT}/p2-after-save-under-filter.png` });
    results.P2 = { before, filtered, after };
    await ctx.close();
}

// ── P3 · three renderings of one palette on one screen ─────────────────────────
{
    const existing = [
        {
            id: "seed-bbb",
            slug: "seed-bbb",
            name: "Same Five",
            colors: draft(5).map((css, i) => ({ css, position: i })),
            createdAt: Date.now(),
        },
    ];
    const { ctx, page } = await seeded(browser, {
        viewport: { width: 1440, height: 1200 },
        colors: draft(5),
        palettes: existing,
    });
    const collapsed = await page.evaluate(() => {
        const well = document.querySelector(".dashed-well");
        const draftDot = well?.querySelector(".watercolor-swatch")?.getBoundingClientRect();
        const strip = document.querySelector('[role="presentation"][aria-hidden="true"]');
        const sr = strip?.getBoundingClientRect();
        const seg = strip?.firstElementChild?.getBoundingClientRect();
        const cs = strip ? getComputedStyle(strip.firstElementChild) : null;
        return {
            draftDot: draftDot ? { w: +draftDot.width.toFixed(1), h: +draftDot.height.toFixed(1) } : null,
            draftDotRadius: well?.querySelector(".watercolor-swatch")
                ? getComputedStyle(well.querySelector(".watercolor-swatch")).borderRadius
                : null,
            stripRect: sr ? { w: +sr.width.toFixed(1), h: +sr.height.toFixed(1) } : null,
            stripSegment: seg ? { w: +seg.width.toFixed(1), h: +seg.height.toFixed(1) } : null,
            stripSegmentRadius: cs?.borderRadius ?? null,
            stripSegmentFilter: cs?.filter ?? null,
        };
    });
    // expand the saved card
    const card = page.locator("text=Same Five").first();
    await card.click().catch(() => {});
    await page.waitForTimeout(800);
    const expanded = await page.evaluate(() => {
        const well = document.querySelector(".dashed-well");
        const all = [...document.querySelectorAll(".watercolor-swatch")];
        const inWell = new Set([...(well?.querySelectorAll(".watercolor-swatch") ?? [])]);
        const cardDots = all.filter((d) => !inWell.has(d));
        return {
            totalDots: all.length,
            wellDots: inWell.size,
            cardDots: cardDots.length,
            cardDotBox: cardDots[0]
                ? {
                      w: +cardDots[0].getBoundingClientRect().width.toFixed(1),
                      h: +cardDots[0].getBoundingClientRect().height.toFixed(1),
                  }
                : null,
            stripStillPresent: !!document.querySelector('[role="presentation"][aria-hidden="true"]'),
        };
    });
    await page.screenshot({ path: `${OUT}/p3-three-renderings.png`, fullPage: true });
    results.P3 = { collapsed, expanded };
    await ctx.close();
}

// ── P4 · 200% zoom ─────────────────────────────────────────────────────────────
{
    const { ctx, page } = await seeded(browser, { viewport: { width: 720, height: 450 }, colors: draft(12), dsf: 2 });
    const m = await page.evaluate(() => {
        const r = document.querySelector(".dashed-well")?.getBoundingClientRect();
        return {
            wellH: r ? +r.height.toFixed(1) : null,
            vh: window.innerHeight,
            share: r ? +((r.height / window.innerHeight) * 100).toFixed(1) : null,
            docOverflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        };
    });
    await page.screenshot({ path: `${OUT}/p4-zoom200-720x450.png` });
    results.P4 = m;
    await ctx.close();
}

await browser.close();
writeFileSync(`${HERE}/probe-D10-pass4.json`, JSON.stringify(results, null, 1));
console.log(JSON.stringify(results, null, 1));

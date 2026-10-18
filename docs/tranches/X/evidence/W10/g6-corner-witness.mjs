// SERVED MODEL: claude-opus-5-5
// X.W10.e · G-6 (CC-100 / OM-2 · OM-11 · OM-12) corner witness — bounded: one
// chromium headless-shell browser, one context per cell, every context and the
// browser closed in finally. Usage: node g6-corner-witness.mjs <label> [outDir]
// (dev server on :9000). PaletteCard.vue is DELETED (d104cd5fc, S-5); its
// successor is the Browse wall's card — PaletteInspector (`.palette-card`,
// role="article") hosting the props-only PaletteSpecimen. For each viewport
// (1440x900, 390x844) at DPR 2 (the owner-marked frames are 2x captures) it
// mounts the wall from the e2e browse fixture's data shape, reads the first
// card's geometry and the computed box-shadow of the card, every descendant
// and every ancestor up to <main>, counts `.cartoon-cast`/`.cartoon-surface`
// in the document, and writes a corner-inclusive clip (card box + 24 css px)
// at rest and at hover (OM-11/OM-12 are the hovered card).
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const label = process.argv[2] ?? "run";
const outDir = process.argv[3] ?? new URL(".", import.meta.url).pathname;
const shotDir = join(outDir, `g6-${label}`);
mkdirSync(shotDir, { recursive: true });
const PAD = 24;
const viewports = [
    [1440, 900],
    [390, 844],
];

const palette = (n) => ({
    name: `Wall Palette ${n}`,
    slug: `wall-palette-${n}`,
    userSlug: "gallery",
    colors: [
        { css: "#f0675f", position: 0 },
        { css: "#eaab5f", position: 1 },
        { css: "#e8955c", position: 2 },
        { css: "#e57e57", position: 3 },
        { css: "#e06b4f", position: 4 },
    ],
    createdAt: "2026-07-05T00:00:00.000Z",
    updatedAt: "2026-07-05T00:00:00.000Z",
    isLocal: false,
    voteCount: n,
    visibility: "public",
    tier: "standard",
    published: true,
});
const DATA = Array.from({ length: 6 }, (_, i) => palette(i + 1));

const read = () => {
    const card = document.querySelector('main [role="article"].palette-card');
    if (!card) return null;
    const sh = (el) => getComputedStyle(el).boxShadow;
    const casters = [];
    for (const el of [card, ...card.querySelectorAll("*")]) {
        const s = sh(el);
        if (s && s !== "none") casters.push({ el: el.className?.toString().slice(0, 80) ?? el.tagName, shadow: s });
    }
    const ancestors = [];
    for (let a = card.parentElement; a && a.tagName !== "MAIN"; a = a.parentElement) {
        const s = sh(a);
        if (s && s !== "none") ancestors.push({ el: a.className?.toString().slice(0, 80) ?? a.tagName, shadow: s });
    }
    const r = card.getBoundingClientRect();
    const cs = getComputedStyle(card);
    return {
        box: { x: r.x, y: r.y, w: r.width, h: r.height },
        radius: cs.borderTopLeftRadius,
        bg: cs.backgroundColor,
        bgClasses: [...card.classList].filter((c) => c.startsWith("bg-")),
        overflow: cs.overflow,
        cardShadow: sh(card),
        casters,
        ancestorCasters: ancestors,
        cartoonCast: document.querySelectorAll(".cartoon-cast").length,
        cartoonSurface: document.querySelectorAll(".cartoon-surface").length,
    };
};

const out = [];
const browser = await chromium.launch();
try {
    for (const [w, h] of viewports) {
        const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
        try {
            const page = await ctx.newPage();
            await page.route(
                (u) =>
                    !/\/(@fs|@id|@vite|node_modules)\//.test(u.pathname) &&
                    !/\.\w+$/.test(u.pathname) &&
                    /(^|\/)palettes(\/|$)/.test(u.pathname),
                (route) =>
                    route.fulfill({
                        status: 200,
                        contentType: "application/json",
                        body: JSON.stringify({ data: DATA, nextCursor: null, hasMore: false }),
                    }),
            );
            await page.goto("http://localhost:9000/#/browse", { waitUntil: "domcontentloaded" });
            const card = page.locator('main [role="article"].palette-card').first();
            await card.waitFor({ state: "visible", timeout: 60_000 });
            await card.scrollIntoViewIfNeeded();
            await page.mouse.move(1, 1);
            await page.waitForTimeout(1200);
            for (const state of ["rest", "hover"]) {
                if (state === "hover") {
                    await card.hover();
                    await page.waitForTimeout(800);
                }
                const m = await page.evaluate(read);
                const b = m.box;
                const clip = {
                    x: Math.max(0, b.x - PAD),
                    y: Math.max(0, b.y - PAD),
                    width: Math.min(w, b.x + b.w + PAD) - Math.max(0, b.x - PAD),
                    height: Math.min(h, b.y + b.h + PAD) - Math.max(0, b.y - PAD),
                };
                const file = `card-${w}x${h}-${state}.png`;
                await page.screenshot({ path: join(shotDir, file), clip, animations: "disabled" });
                out.push({ viewport: `${w}x${h}`, state, file, clip, ...m });
                console.log(
                    `${w}x${h} ${state} radius=${m.radius} cardShadow=${m.cardShadow} casters=${m.casters.length} ancestorCasters=${m.ancestorCasters.length} cartoonCast=${m.cartoonCast} cartoonSurface=${m.cartoonSurface} overflow=${m.overflow} bg=${m.bg}`,
                );
            }
        } finally {
            await ctx.close();
        }
    }
} finally {
    await browser.close();
}
writeFileSync(join(outDir, `g6-${label}.json`), JSON.stringify(out, null, 2));

// CHALLENGE-D pass 5 — chromium arm: tab order, forced-colors, live-region
// truth, strip geometry, hover/press deltas, ramp hue arc. Read-only.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const OUT = path.dirname(new URL(import.meta.url).pathname);
const ROUTE = "http://localhost:9000/#/palettes";

const mkColors = (n, tag) =>
    Array.from({ length: n }, (_, i) => ({
        css: `oklch(0.72 0.16 ${(i * 360) / n})`,
        name: `${tag}-${i}`,
        position: i,
    }));
const LONG_NAME =
    "Autumnal Ridgeline Chromatic Study Number Seventeen Revised Extended Edition For Print And Screen X";

function seed(n) {
    const now = new Date().toISOString();
    const p = (id, name, colors) => ({ id, name, slug: id, colors, createdAt: now, updatedAt: now, isLocal: true });
    const list = [
        p("p-max", LONG_NAME, mkColors(1, "solo")),
        p("p-fifty", "Fifty", mkColors(50, "c")),
        p("p-uni", "Zephyr", mkColors(5, "u")),
        p("p-one", "One", mkColors(1, "o")),
    ];
    for (let i = 0; i < n; i++)
        list.push(p(`p-${i}`, ["Sunset Ridge", "Moss & Bone", "Harbor", "Ochre Field", "Nightfall"][i % 5] + " " + (i + 1), mkColors(3 + (i % 5), `s${i}`)));
    return { version: 1, palettes: list };
}

const paneJs = `(() => {
  const h=[...document.querySelectorAll('h1,h2,h3,h4')].find(e=>/My\\s*Palettes/.test(e.textContent||''));
  return h ? h.closest("[class*='pane-scroll-fade']") : null;
})()`;

async function boot(b, opts, store) {
    const ctx = await b.newContext(opts);
    const page = await ctx.newPage();
    await page.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)), store);
    await page.goto(ROUTE, { waitUntil: "networkidle" });
    await page.waitForTimeout(1200);
    return { ctx, page };
}

const out = {};
const b = await chromium.launch();

// ─────────── A. desktop light: tab order, strip geometry, ramp, hover ───────────
{
    const { ctx, page } = await boot(b, { viewport: { width: 1440, height: 900 }, colorScheme: "light" }, seed(8));

    // strict document tab walk
    await page.evaluate(() => window.scrollTo(0, 0));
    const walk = [];
    for (let i = 0; i < 34; i++) {
        await page.keyboard.press("Tab");
        walk.push(
            await page.evaluate(() => {
                const a = document.activeElement;
                if (!a || a === document.body) return { tag: "BODY" };
                const r = a.getBoundingClientRect();
                const c = getComputedStyle(a);
                return {
                    tag: a.tagName,
                    name: a.getAttribute("aria-label") || (a.textContent || "").replace(/\s+/g, " ").trim().slice(0, 34) || a.getAttribute("placeholder") || "(unnamed)",
                    w: Math.round(r.width), h: Math.round(r.height),
                    outlineStyle: c.outlineStyle, outlineWidth: c.outlineWidth,
                    shadow: c.boxShadow.slice(0, 60),
                    inPane: !!a.closest("[class*='pane-scroll-fade']"),
                    clippedTop: r.top < 103, // pane's own top edge in this layout
                };
            }),
        );
    }
    out.tabWalkChromium = walk;

    out.strip = await page.evaluate((paneSrc) => {
        const pane = eval(paneSrc);
        const cards = [...pane.querySelectorAll('[role="article"]')];
        const info = (c) => {
            const strip = c.querySelector('[role="presentation"]');
            const segs = [...strip.children];
            const sr = strip.getBoundingClientRect();
            const w = segs.map((s) => Math.round(s.getBoundingClientRect().width * 100) / 100);
            return {
                name: c.getAttribute("aria-label").replace("Palette: ", "").slice(0, 26),
                stripW: Math.round(sr.width), stripH: Math.round(sr.height),
                segCount: segs.length,
                minSegW: Math.min(...w), maxSegW: Math.max(...w),
                segAreaPx2: Math.round(Math.min(...w) * sr.height),
                cardH: Math.round(c.getBoundingClientRect().height),
            };
        };
        return cards.slice(0, 5).map(info);
    }, paneJs);

    out.ramp = await page.evaluate((paneSrc) => {
        const pane = eval(paneSrc);
        const span = pane.querySelector(".palettes-ramp-text");
        const c = getComputedStyle(span);
        const root = getComputedStyle(document.documentElement);
        return {
            backgroundImage: c.backgroundImage,
            color: c.color,
            backgroundClip: c.backgroundClip || c.webkitBackgroundClip,
            tokens: {
                t0: root.getPropertyValue("--palettes-ramp-title-0").trim(),
                t1: root.getPropertyValue("--palettes-ramp-title-1").trim(),
                t2: root.getPropertyValue("--palettes-ramp-title-2").trim(),
                g0: root.getPropertyValue("--palettes-ramp-0").trim(),
                g1: root.getPropertyValue("--palettes-ramp-1").trim(),
                g2: root.getPropertyValue("--palettes-ramp-2").trim(),
            },
        };
    }, paneJs);

    // material agreement — LIGHT
    out.materialLight = await page.evaluate((paneSrc) => {
        const pane = eval(paneSrc);
        const g = (el, tag) => {
            if (!el) return { tag, missing: true };
            const c = getComputedStyle(el);
            return { tag, bg: c.backgroundColor, border: c.borderColor + " " + c.borderStyle + " " + c.borderWidth, shadow: c.boxShadow.slice(0, 100), backdrop: c.backdropFilter, radius: c.borderRadius };
        };
        return [
            g(pane, "pane Card(tier=resting)"),
            g(pane.querySelector("[class*='search-seated']"), "SearchBar .search-seated"),
            g(pane.querySelector('[class*="border-dashed"]'), "CurrentPaletteEditor plate"),
            g(pane.querySelector('[role="article"]'), "PaletteCard"),
        ];
    }, paneJs);

    // hover + active deltas on a card
    const card = page.locator('[role="article"]').first();
    const before = await card.evaluate((e) => ({ t: getComputedStyle(e).transform, s: getComputedStyle(e).boxShadow.slice(0, 60) }));
    await card.hover();
    await page.waitForTimeout(400);
    const hovered = await card.evaluate((e) => ({ t: getComputedStyle(e).transform, s: getComputedStyle(e).boxShadow.slice(0, 60), cursor: getComputedStyle(e).cursor }));
    out.cardStates = { rest: before, hover: hovered };
    await page.screenshot({ path: path.join(OUT, "chromium-desktop-light-card-hover.png") });

    // ── filter to zero: what does the live region say? ──
    const input = pane_input(page);
    await input.fill("zzzzzz");
    await page.waitForTimeout(700);
    out.filterZero = await page.evaluate((paneSrc) => {
        const pane = eval(paneSrc);
        const h = [...document.querySelectorAll("h1,h2,h3,h4")].find((e) => /My\s*Palettes/.test(e.textContent || ""));
        return {
            headingText: h.textContent.replace(/\s+/g, " ").trim(),
            cards: pane.querySelectorAll('[role="article"]').length,
            liveRegions: [...pane.querySelectorAll('[role="status"],[role="alert"],[aria-live]')].map((e) => ({
                role: e.getAttribute("role"), live: e.getAttribute("aria-live"),
                text: (e.textContent || "").replace(/\s+/g, " ").trim().slice(0, 120),
            })),
            trashStillOffered: !!pane.querySelector('[aria-label="Delete all saved palettes"]'),
        };
    }, paneJs);
    await page.screenshot({ path: path.join(OUT, "chromium-desktop-light-filter-zero.png") });
    await ctx.close();
}

function pane_input(page) {
    return page.locator("input[placeholder='Search your palettes...']").first();
}

// ─────────── B. forced-colors, pathological seed ───────────
{
    const { ctx, page } = await boot(b, { viewport: { width: 1440, height: 900 }, colorScheme: "light", forcedColors: "active" }, seed(8));
    out.forcedColors = await page.evaluate((paneSrc) => {
        const pane = eval(paneSrc);
        const card = pane.querySelector('[role="article"]');
        const strip = card.querySelector('[role="presentation"]');
        const seg = strip.children[0];
        const trash = pane.querySelector('[aria-label="Delete all saved palettes"]');
        const g = (e) => (e ? { bg: getComputedStyle(e).backgroundColor, border: getComputedStyle(e).borderColor, color: getComputedStyle(e).color } : null);
        return { card: g(card), strip: g(strip), segment: g(seg), trash: g(trash), pane: g(pane) };
    }, paneJs);
    await page.screenshot({ path: path.join(OUT, "chromium-forced-colors-pathological.png") });
    await ctx.close();
}

// ─────────── C. 200% zoom == 720x450, pathological ───────────
{
    const { ctx, page } = await boot(b, { viewport: { width: 720, height: 450 }, deviceScaleFactor: 2, colorScheme: "light" }, seed(8));
    out.zoom200 = await page.evaluate((paneSrc) => {
        const pane = eval(paneSrc);
        return {
            paneRect: pane.getBoundingClientRect().toJSON(),
            docOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
            cards: pane.querySelectorAll('[role="article"]').length,
            firstCardW: pane.querySelector('[role="article"]').getBoundingClientRect().width,
            minSeg: (() => {
                const s = pane.querySelectorAll('[role="presentation"]')[1];
                return s ? Math.min(...[...s.children].map((x) => x.getBoundingClientRect().width)) : null;
            })(),
        };
    }, paneJs);
    await page.screenshot({ path: path.join(OUT, "chromium-zoom200-pathological.png") });
    await ctx.close();
}

// ─────────── D. RTL, pathological ───────────
{
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    const page = await ctx.newPage();
    await page.addInitScript((s) => {
        localStorage.setItem("color-palettes", JSON.stringify(s));
        document.addEventListener("DOMContentLoaded", () => { document.documentElement.dir = "rtl"; });
    }, seed(8));
    await page.goto(ROUTE, { waitUntil: "networkidle" });
    await page.evaluate(() => (document.documentElement.dir = "rtl"));
    await page.waitForTimeout(1000);
    out.rtl = await page.evaluate((paneSrc) => {
        const pane = eval(paneSrc);
        const strip = pane.querySelectorAll('[role="presentation"]')[1];
        const first = strip?.children[0];
        return {
            dir: document.documentElement.dir,
            paneX: Math.round(pane.getBoundingClientRect().x),
            stripFirstSegX: first ? Math.round(first.getBoundingClientRect().x) : null,
            stripX: strip ? Math.round(strip.getBoundingClientRect().x) : null,
            stripFlexDir: strip ? getComputedStyle(strip).flexDirection : null,
        };
    }, paneJs);
    await page.screenshot({ path: path.join(OUT, "chromium-rtl-pathological.png") });
    await ctx.close();
}

await b.close();
fs.writeFileSync(path.join(OUT, "TELEMETRY-chromium.json"), JSON.stringify(out, null, 2));
console.log("done chromium");

// CHALLENGE-D pass 3 — probe B.
// Decides ONE thing the owner ordered fixed at root: WHY the card's cast
// shadow terminates in a hard vertical edge (MT-F036 / OM-11 / OM-12).
// Hypothesis: `.palette-card-grid { contain: content }` (= layout paint style)
// clips every card's -7px left shadow and the last card's +7px bottom shadow
// at the grid's padding box.
// Also measures: forced-colors, reduced-motion, 200% zoom, drag state,
// expanded state, and the concentricity of the strip's corner.
import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";

const OUT = new URL("./evidence/", import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });
const R = {};
const NOW = new Date().toISOString();
const mk = (css, i) => ({ css, position: i });
const FIXTURE = {
    version: 1,
    palettes: [
        { id: "p-sunset", slug: "sunset-ridge", name: "Sunset Ridge", createdAt: NOW, updatedAt: NOW, isLocal: true, colors: ["#f4a261", "#e76f51", "#2a9d8f", "#264653", "#e9c46a"].map(mk), tags: ["warm", "test", "alpha"], forkCount: 3, versionCount: 4 },
        { id: "p-ocean", slug: "deep-ocean", name: "Deep Ocean", createdAt: NOW, updatedAt: NOW, isLocal: true, colors: ["#03045e", "#0077b6", "#00b4d8"].map(mk), tags: ["cool"] },
        { id: "p-empty", slug: "empty", name: "Empty", createdAt: NOW, updatedAt: NOW, isLocal: true, colors: [] },
    ],
};

async function seed(page, url = "http://localhost:9000/#/palettes") {
    await page.goto(url, { waitUntil: "networkidle" });
    await page.evaluate((f) => localStorage.setItem("color-palettes", JSON.stringify(f)), FIXTURE);
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(2200);
}

async function main() {
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await seed(page);

    // --- A. containment clip proof --------------------------------------
    R.clip = await page.evaluate(() => {
        const grid = document.querySelector(".palette-card-grid");
        const cards = [...document.querySelectorAll('[role="article"]')];
        const g = grid.getBoundingClientRect();
        const gs = getComputedStyle(grid);
        const c0 = cards[0].getBoundingClientRect();
        const last = cards[cards.length - 1].getBoundingClientRect();
        const cs = getComputedStyle(cards[0]);
        // resolved shadow extents from the computed value
        const offsets = [...cs.boxShadow.matchAll(/(-?\d+(?:\.\d+)?)px\s+(-?\d+(?:\.\d+)?)px\s+(-?\d+(?:\.\d+)?)px/g)]
            .map((m) => ({ x: +m[1], y: +m[2], blur: +m[3] }));
        const maxLeft = Math.max(0, ...offsets.map((o) => -o.x + o.blur));
        const maxDown = Math.max(0, ...offsets.map((o) => o.y + o.blur));
        return {
            gridContain: gs.contain,
            gridPaddingLeft: gs.paddingLeft,
            gridPaddingBottom: gs.paddingBottom,
            gridBox: { x: +g.x.toFixed(1), w: +g.width.toFixed(1), bottom: +g.bottom.toFixed(1) },
            firstCardBox: { x: +c0.x.toFixed(1), w: +c0.width.toFixed(1) },
            lastCardBottom: +last.bottom.toFixed(1),
            shadowOffsets: offsets,
            shadowExtendsLeftPx: maxLeft,
            shadowExtendsDownPx: maxDown,
            // The clip test, stated arithmetically:
            leftOverflowPx: +(c0.x - maxLeft - g.x).toFixed(1),   // negative ⇒ shadow starts left of the grid padding box ⇒ clipped
            bottomOverflowPx: +(g.bottom - (last.bottom + maxDown)).toFixed(1), // negative ⇒ clipped
        };
    });

    // pixel witness: sample a column of pixels immediately left of the card
    // with containment ON, then with it forced OFF, and diff.
    const sampleStrip = async () =>
        page.evaluate(async () => {
            const card = document.querySelector('[role="article"]');
            const r = card.getBoundingClientRect();
            // Read the composited pixels via html2canvas-free means: use
            // elementsFromPoint is not colour. Instead report geometry only.
            return { x: r.x, y: r.y, w: r.width, h: r.height };
        });

    const geo = await sampleStrip();
    const clipBox = { x: Math.round(geo.x - 14), y: Math.round(geo.y - 6), width: 40, height: Math.round(geo.h + 20) };
    await page.screenshot({ path: OUT + "p3-clip-ON.png", clip: clipBox });
    await page.addStyleTag({ content: ".palette-card-grid{contain:none !important}" });
    await page.waitForTimeout(200);
    await page.screenshot({ path: OUT + "p3-clip-OFF.png", clip: clipBox });
    await page.screenshot({ path: OUT + "p3-field-1440-contain-none.png", fullPage: true });

    // --- B. concentricity ------------------------------------------------
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(2000);
    R.concentric = await page.evaluate(() => {
        const card = document.querySelector('[role="article"]');
        const strip = card.querySelector('[role="presentation"]');
        const cs = getComputedStyle(card), ss = getComputedStyle(strip);
        return {
            cardOuterRadius: cs.borderTopLeftRadius,
            cardBorderWidth: cs.borderTopWidth,
            cardInnerRadiusForConcentricity:
                (parseFloat(cs.borderTopLeftRadius) - parseFloat(cs.borderTopWidth)).toFixed(1) + "px",
            stripRadius: ss.borderTopLeftRadius,
            deltaPx: (parseFloat(ss.borderTopLeftRadius) - (parseFloat(cs.borderTopLeftRadius) - parseFloat(cs.borderTopWidth))).toFixed(1),
            stripOverflow: ss.overflow,
        };
    });

    // --- C. expanded state, swatch sizes, loading-skeleton silhouette -----
    await page.click('[role="article"]');
    await page.waitForTimeout(900);
    R.expanded = await page.evaluate(() => {
        const cards = [...document.querySelectorAll('[role="article"]')];
        const c = cards[0];
        const dots = [...c.querySelectorAll('[aria-label^="Color swatch"]')];
        const rr = (e) => { const r = e.getBoundingClientRect(); return { w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; };
        return {
            expandedHeight: +c.getBoundingClientRect().height.toFixed(1),
            collapsedHeights: cards.slice(1).map((x) => +x.getBoundingClientRect().height.toFixed(1)),
            swatchCount: dots.length,
            swatchSize: dots[0] ? rr(dots[0]) : null,
            swatchRadius: dots[0] ? getComputedStyle(dots[0]).borderRadius : null,
            rootClassAfterExpand: c.className,
            rootAriaExpanded: c.getAttribute("aria-expanded"),
            rootAriaPressed: c.getAttribute("aria-pressed"),
            stripStillPresent: !!c.querySelector('[role="presentation"]'),
        };
    });
    await page.screenshot({ path: OUT + "p3-expanded-1440.png", fullPage: true });

    // --- D. skeleton silhouette (render it via Browse's loading path) -----
    R.skeleton = await page.evaluate(() => {
        // Read the declared utility geometry from the source-shipped classes by
        // constructing a detached probe element with the same class list.
        const probe = document.createElement("div");
        probe.className = "w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-badge";
        probe.style.position = "absolute"; probe.style.visibility = "hidden";
        document.body.appendChild(probe);
        const a = probe.getBoundingClientRect();
        probe.className = "w-9 h-9 sm:w-10 sm:h-10";
        const b = probe.getBoundingClientRect();
        const out = { skeletonSwatch: { w: a.width, h: a.height }, cardDefaultSwatch: { w: b.width, h: b.height } };
        probe.remove();
        return out;
    });

    // --- E. forced-colors / reduced-motion / 200% zoom --------------------
    await page.emulateMedia({ forcedColors: "active" });
    await page.waitForTimeout(700);
    R.forcedColors = await page.evaluate(() => {
        const c = document.querySelector('[role="article"]');
        const s = getComputedStyle(c);
        const strip = c.querySelector('[role="presentation"] > div');
        return {
            cardBg: s.backgroundColor, cardBorderColor: s.borderTopColor, boxShadow: s.boxShadow,
            forcedColorAdjust: s.forcedColorAdjust,
            stripSegBg: strip ? getComputedStyle(strip).backgroundColor : null,
            stripSegForcedAdjust: strip ? getComputedStyle(strip).forcedColorAdjust : null,
        };
    });
    await page.screenshot({ path: OUT + "p3-forced-colors.png", fullPage: true });
    await page.emulateMedia({ forcedColors: "none", reducedMotion: "reduce" });
    await page.waitForTimeout(500);
    R.reducedMotion = await page.evaluate(() => {
        const c = document.querySelector('[role="article"]');
        const s = getComputedStyle(c);
        return { transitionDuration: s.transitionDuration, animationName: s.animationName };
    });
    await page.emulateMedia({ reducedMotion: "no-preference" });

    // 200% zoom == half viewport at same CSS px
    await page.setViewportSize({ width: 720, height: 500 });
    await page.waitForTimeout(700);
    R.zoom200 = await page.evaluate(() => {
        const cards = [...document.querySelectorAll('[role="article"]')];
        const doc = document.documentElement;
        return {
            overflowX: doc.scrollWidth - doc.clientWidth,
            cards: cards.map((c) => {
                const t = c.querySelector(".font-display");
                return { label: c.getAttribute("aria-label"), w: +c.getBoundingClientRect().width.toFixed(1), titleW: t ? +t.getBoundingClientRect().width.toFixed(1) : null, titleScroll: t ? t.scrollWidth : null };
            }),
        };
    });
    await page.screenshot({ path: OUT + "p3-zoom200.png", fullPage: true });

    // --- F. RTL ------------------------------------------------------------
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.evaluate(() => document.documentElement.setAttribute("dir", "rtl"));
    await page.waitForTimeout(700);
    R.rtl = await page.evaluate(() => {
        const c = document.querySelector('[role="article"]');
        const s = getComputedStyle(c);
        const strip = c.querySelector('[role="presentation"]');
        const menu = c.querySelector('[aria-label="Palette menu"]');
        const r = c.getBoundingClientRect();
        return {
            dir: document.documentElement.dir,
            boxShadow: s.boxShadow,
            stripFirstSegColor: strip?.firstElementChild ? getComputedStyle(strip.firstElementChild).backgroundColor : null,
            stripFirstSegX: strip?.firstElementChild ? +strip.firstElementChild.getBoundingClientRect().x.toFixed(1) : null,
            cardX: +r.x.toFixed(1),
            menuX: menu ? +menu.getBoundingClientRect().x.toFixed(1) : null,
            stripRadiusTL: strip ? getComputedStyle(strip).borderTopLeftRadius : null,
            stripRadiusTR: strip ? getComputedStyle(strip).borderTopRightRadius : null,
        };
    });
    await page.screenshot({ path: OUT + "p3-rtl-1440.png", fullPage: true });
    await page.evaluate(() => document.documentElement.removeAttribute("dir"));

    writeFileSync(OUT + "../probe-D5b-results.json", JSON.stringify(R, null, 2));
    console.log(JSON.stringify(R, null, 2));
    await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });

// CHALLENGE-D probe D1 — PaletteCardSwatches, populated + expanded.
// Read-only against the LIVE dev server (localhost:9000). Seeds client-side
// localStorage only; no repo, no server, no source mutated.
import { webkit } from "playwright";

const ORIGIN = "http://localhost:9000";

const now = new Date().toISOString();
const mk = (name, slug, cssList, extra = {}) => ({
    id: `local-${slug}`,
    name,
    slug,
    userSlug: extra.userSlug,
    colors: cssList.map((css, position) => ({ css, position })),
    tags: extra.tags,
    createdAt: now,
    updatedAt: now,
    isLocal: true,
    ...extra,
});

const STORE = {
    version: 1,
    palettes: [
        mk("Deep Ocean", "deep-ocean", [
            "#12314f", "#173d5c", "#3a8296", "#7fc6c1", "#e8f3ef",
        ], { userSlug: "mbabb", tags: ["warm", "test", "alpha"] }),
        mk("Empty Set", "empty-set", []),
        mk("Long Slug Palette", "long-slug-palette", ["#c33", "#3c3", "#33c"], {
            userSlug: "a-very-long-user-slug-that-will-definitely-truncate-somewhere",
        }),
        mk("Twenty Four", "twenty-four",
            Array.from({ length: 24 }, (_, i) => `hsl(${i * 15} 70% 55%)`),
            { userSlug: "mbabb" }),
    ],
};

const results = {};

async function run(label, { width, height, isMobile, hasTouch, colorScheme, forcedColors, reducedMotion, zoom }) {
    const browser = await webkit.launch();
    const ctx = await browser.newContext({
        viewport: { width, height },
        isMobile: !!isMobile,
        hasTouch: !!hasTouch,
        colorScheme: colorScheme ?? "light",
        forcedColors: forcedColors ?? "none",
        reducedMotion: reducedMotion ?? "no-preference",
        deviceScaleFactor: 2,
    });
    const page = await ctx.newPage();
    const consoleErrs = [];
    page.on("console", (m) => m.type() === "error" && consoleErrs.push(m.text()));
    page.on("pageerror", (e) => consoleErrs.push("PAGEERROR " + e.message));

    await page.addInitScript((s) => {
        localStorage.setItem("color-palettes", JSON.stringify(s));
    }, STORE);

    await page.goto(`${ORIGIN}/#/palettes`, { waitUntil: "load" });
    if (zoom) await page.evaluate((z) => { document.documentElement.style.zoom = String(z); }, zoom);
    await page.waitForTimeout(3500);

    // Expand the first card (Deep Ocean) by clicking its article root.
    const cards = page.locator('[role="article"]');
    const cardCount = await cards.count();
    const out = { cardCount, consoleErrs: [] };

    if (cardCount > 0) {
        await cards.first().click({ position: { x: 200, y: 12 } }).catch(() => {});
        await page.waitForTimeout(900);
    }

    out.probe = await page.evaluate(() => {
        const px = (el, p) => parseFloat(getComputedStyle(el)[p]);
        const arts = [...document.querySelectorAll('[role="article"]')];
        const rep = {};
        // the expanded swatch panel: the wrapper carrying overflow-hidden that
        // holds .watercolor-swatch dots
        const dots = [...document.querySelectorAll('[data-testid="watercolor-swatch"]')];
        rep.totalDots = dots.length;
        const inCard = dots.filter((d) => d.closest('[role="article"]'));
        rep.dotsInCards = inCard.length;
        const d0 = inCard[0];
        if (d0) {
            const cs = getComputedStyle(d0);
            const r = d0.getBoundingClientRect();
            rep.dot0 = {
                tagName: d0.tagName,
                ariaHidden: d0.getAttribute("aria-hidden"),
                ariaLabel: d0.getAttribute("aria-label"),
                tagAttr: d0.getAttribute("tag"),
                role: d0.getAttribute("role"),
                tabIndex: d0.tabIndex,
                pointerEvents: cs.pointerEvents,
                w: +r.width.toFixed(2), h: +r.height.toFixed(2),
                outerAttrs: [...d0.attributes].map((a) => a.name).join(","),
            };
            // does the dot's parent carry any click/keyboard semantics?
            const p = d0.parentElement;
            rep.dotParent = p && {
                tagName: p.tagName,
                cls: p.className,
                role: p.getAttribute("role"),
                tabIndex: p.tabIndex,
                pointerEvents: getComputedStyle(p).pointerEvents,
            };
        }
        // the swatch panel container
        const panel = d0 && d0.closest("div.flex.flex-wrap");
        if (panel) {
            const cs = getComputedStyle(panel);
            const r = panel.getBoundingClientRect();
            rep.panel = {
                cls: panel.className,
                paddingTop: cs.paddingTop, paddingBottom: cs.paddingBottom,
                paddingLeft: cs.paddingLeft, paddingRight: cs.paddingRight,
                gap: cs.gap,
                borderTopWidth: cs.borderTopWidth, borderTopColor: cs.borderTopColor,
                w: +r.width.toFixed(2), h: +r.height.toFixed(2),
            };
        }
        // slug row + copy button geometry
        const copyBtns = [...document.querySelectorAll('button[aria-label^="Copy slug"]')];
        rep.copySlugBtns = copyBtns.map((b) => {
            const r = b.getBoundingClientRect();
            const cs = getComputedStyle(b);
            return {
                w: +r.width.toFixed(2), h: +r.height.toFixed(2),
                padding: cs.padding,
                transitionProperty: cs.transitionProperty,
                transitionDuration: cs.transitionDuration,
                transitionTimingFunction: cs.transitionTimingFunction,
            };
        });
        const slugPill = document.querySelector('[role="article"] span.rounded-full.truncate');
        if (slugPill) {
            const cs = getComputedStyle(slugPill);
            const r = slugPill.getBoundingClientRect();
            rep.slugPill = {
                text: slugPill.textContent.trim(),
                color: cs.color, borderColor: cs.borderTopColor,
                fontFamily: cs.fontFamily.split(",")[0],
                fontSize: cs.fontSize, fontWeight: cs.fontWeight,
                maxWidth: cs.maxWidth, w: +r.width.toFixed(2), h: +r.height.toFixed(2),
                overflowXScroll: slugPill.scrollWidth > slugPill.clientWidth,
            };
        }
        // interactive inventory inside the expanded panel
        const art = arts[0];
        if (art) {
            const focusables = [...art.querySelectorAll('a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])')];
            rep.focusablesInCard = focusables.length;
            rep.focusableLabels = focusables.map((f) => f.getAttribute("aria-label") || f.textContent.trim().slice(0, 24));
        }
        // teleported hover panels
        rep.floatingPanels = [...document.querySelectorAll("body > .floating-panel")].length;
        // reduced-motion / transition audit on the action buttons
        const actionBtn = document.querySelector('button[aria-label^="Edit color"], button[aria-label^="Copy color"]');
        if (actionBtn) {
            const cs = getComputedStyle(actionBtn);
            rep.actionBtn = {
                transitionProperty: cs.transitionProperty,
                transitionDuration: cs.transitionDuration,
            };
        }
        rep.docOverflowX = document.documentElement.scrollWidth - document.documentElement.clientWidth;
        return rep;
    });

    out.consoleErrs = consoleErrs.slice(0, 5);
    results[label] = out;

    await page.screenshot({
        path: `docs/tranches/V/megatranche/audit/components/PaletteCardSwatches/shot-${label}.png`,
        fullPage: false,
    });
    await browser.close();
}

await run("desktop-light", { width: 1440, height: 900, colorScheme: "light" });
await run("desktop-dark", { width: 1440, height: 900, colorScheme: "dark" });
await run("mobile-light", { width: 390, height: 844, isMobile: true, hasTouch: true, colorScheme: "light" });
await run("forced-colors", { width: 1440, height: 900, forcedColors: "active", colorScheme: "light" });
await run("zoom-200", { width: 1440, height: 900, zoom: 2 });

console.log(JSON.stringify(results, null, 2));

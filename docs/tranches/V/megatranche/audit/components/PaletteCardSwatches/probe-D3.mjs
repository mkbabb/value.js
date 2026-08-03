// CHALLENGE-D probe D3 — branch truth, hierarchy, empty/overflow states,
// dark-mode ink, forced-colors, reduced-motion. Read-only; API intercepted.
import { webkit } from "playwright";

const ORIGIN = "http://192.168.1.166:9000";
const now = new Date().toISOString();
const mk = (name, slug, cssList, userSlug, extra = {}) => ({
    name, slug, userSlug,
    colors: cssList.map((css, position) => ({ css, position })),
    createdAt: now, updatedAt: now, isLocal: false,
    visibility: "public", tier: "standard", published: true,
    voteCount: 3, versionCount: 2, forkCount: 1, ...extra,
});
const PAGE = {
    data: [
        mk("Deep Ocean", "deep-ocean", ["#12314f", "#173d5c", "#3a8296", "#7fc6c1", "#e8f3ef"], "mbabb", { tags: ["warm", "test", "alpha"] }),
        mk("Nothing Here", "nothing-here", [], "zed"),
        mk("Twenty Four", "twenty-four", Array.from({ length: 24 }, (_, i) => `hsl(${i * 15} 70% 55%)`), "mbabb"),
    ],
    nextCursor: null, hasMore: false,
};

const REL = (rgb) => {
    const [r, g, b] = rgb.match(/[\d.]+/g).slice(0, 3).map(Number).map((v) => {
        const s = v / 255;
        return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const CR = (a, b) => { const [x, y] = [REL(a), REL(b)].sort((m, n) => n - m); return +((x + 0.05) / (y + 0.05)).toFixed(2); };

async function boot(opts) {
    const browser = await webkit.launch();
    const ctx = await browser.newContext({
        viewport: { width: opts.width ?? 1440, height: opts.height ?? 900 },
        hasTouch: !!opts.hasTouch, isMobile: !!opts.isMobile,
        colorScheme: opts.colorScheme ?? "light",
        forcedColors: opts.forcedColors ?? "none",
        reducedMotion: opts.reducedMotion ?? "no-preference",
        deviceScaleFactor: 2,
    });
    const page = await ctx.newPage();
    await page.route("**://localhost:3000/**", (route) => {
        const u = route.request().url();
        if (u.includes("/palettes?")) return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(PAGE) });
        return route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
    });
    await page.goto(`${ORIGIN}/#/browse`, { waitUntil: "load" });
    await page.waitForTimeout(3200);
    return { browser, page };
}

async function expand(page, idx) {
    const cards = page.locator('[role="article"]');
    await cards.nth(idx).click({ position: { x: 260, y: 70 } }).catch(() => {});
    await page.waitForTimeout(900);
}

const out = {};

// ── 1. desktop light: branch truth + hierarchy + hover panel ──────────────
{
    const { browser, page } = await boot({});
    out["1_mq"] = await page.evaluate(() => ({
        hoverHover: matchMedia("(hover: hover)").matches,
        anyHover: matchMedia("(any-hover: hover)").matches,
        pointerFine: matchMedia("(pointer: fine)").matches,
        prm: matchMedia("(prefers-reduced-motion: reduce)").matches,
    }));
    await expand(page, 0);
    out["1_hierarchy"] = await page.evaluate(() => {
        const art = document.querySelectorAll('[role="article"]')[0];
        const g = (el) => el && { text: el.textContent.trim().slice(0, 20), fs: getComputedStyle(el).fontSize, fw: getComputedStyle(el).fontWeight, ff: getComputedStyle(el).fontFamily.split(",")[0].replace(/"/g, "") };
        return {
            title: g(art.querySelector(".font-display")),
            countBadge: g(art.querySelector(".text-mono-small")),
            slugPill: g(art.querySelector("span.rounded-full.truncate")),
            cardBg: getComputedStyle(art).backgroundColor,
        };
    });
    // hover the WRAPPER of dot 0 (the dot itself is pointer-events:none)
    const box = await page.evaluate(() => {
        const art = document.querySelectorAll('[role="article"]')[0];
        const d = art.querySelectorAll('[data-testid="watercolor-swatch"]')[0];
        const w = d.parentElement.getBoundingClientRect();
        return { x: w.x + w.width / 2, y: w.y + w.height / 2 };
    });
    await page.mouse.move(box.x - 60, box.y - 60);
    await page.mouse.move(box.x, box.y, { steps: 8 });
    await page.waitForTimeout(600);
    out["1_hoverPanel"] = await page.evaluate(() => {
        const p = document.querySelector("body > .floating-panel");
        if (!p) return { present: false, bodyChildren: [...document.body.children].map((c) => c.className || c.tagName).slice(-6) };
        const b = p.getBoundingClientRect();
        const btns = [...p.querySelectorAll("button")];
        const cs = getComputedStyle(p);
        return {
            present: true, ariaHidden: p.getAttribute("aria-hidden"),
            rect: { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) },
            position: cs.position, zIndex: cs.zIndex, transform: cs.transform,
            animationName: cs.animationName, transitionProperty: cs.transitionProperty,
            btnLabels: btns.map((x) => x.getAttribute("aria-label")),
            btnTabIndex: btns.map((x) => x.tabIndex),
            btnRects: btns.map((x) => { const r = x.getBoundingClientRect(); return `${r.width.toFixed(0)}x${r.height.toFixed(0)}`; }),
            btnTransition: btns[0] && `${getComputedStyle(btns[0]).transitionProperty} / ${getComputedStyle(btns[0]).transitionDuration}`,
            // WCAG 4.1.2 / axe `aria-hidden-focus`: focusable content inside aria-hidden
            focusablesInsideAriaHidden: btns.length,
        };
    });
    // can the panel buttons actually receive focus?
    out["1_focusIntoHiddenPanel"] = await page.evaluate(() => {
        const p = document.querySelector("body > .floating-panel");
        if (!p) return null;
        const b = p.querySelector("button");
        b.focus();
        return { activeIsPanelBtn: document.activeElement === b, label: document.activeElement.getAttribute("aria-label") };
    });
    await page.screenshot({ path: "docs/tranches/V/megatranche/audit/components/PaletteCardSwatches/shot-hover-panel-desktop.png" });
    await browser.close();
}

// ── 2. empty palette expanded (0 colors) ──────────────────────────────────
{
    const { browser, page } = await boot({});
    await expand(page, 1);
    out["2_emptyExpanded"] = await page.evaluate(() => {
        const art = document.querySelectorAll('[role="article"]')[1];
        const panel = [...art.querySelectorAll("div")].find((d) => d.className.includes("flex-wrap") && d.className.includes("px-3"));
        const r = panel && panel.getBoundingClientRect();
        return {
            cardH: +art.getBoundingClientRect().height.toFixed(2),
            panelPresent: !!panel,
            panelCls: panel && panel.className,
            panelH: r && +r.height.toFixed(2),
            panelChildren: panel && panel.children.length,
            panelText: panel && panel.textContent.trim(),
            dots: art.querySelectorAll('[data-testid="watercolor-swatch"]').length,
        };
    });
    await page.screenshot({ path: "docs/tranches/V/megatranche/audit/components/PaletteCardSwatches/shot-empty-expanded.png" });
    await browser.close();
}

// ── 3. 24-color palette expanded — height + DOM cost ──────────────────────
{
    const { browser, page } = await boot({});
    const t0 = Date.now();
    await expand(page, 2);
    out["3_bigExpanded"] = await page.evaluate(() => {
        const art = document.querySelectorAll('[role="article"]')[2];
        const panel = [...art.querySelectorAll("div")].find((d) => d.className.includes("flex-wrap") && d.className.includes("px-3"));
        return {
            cardH: +art.getBoundingClientRect().height.toFixed(2),
            panelH: panel && +panel.getBoundingClientRect().height.toFixed(2),
            dots: art.querySelectorAll('[data-testid="watercolor-swatch"]').length,
            svgFilters: art.querySelectorAll("svg filter").length,
            nodesInPanel: panel ? panel.querySelectorAll("*").length : 0,
            viewportH: innerHeight,
        };
    });
    out["3_elapsedMs"] = Date.now() - t0;
    await page.screenshot({ path: "docs/tranches/V/megatranche/audit/components/PaletteCardSwatches/shot-24-expanded.png" });
    await browser.close();
}

// ── 4. dark mode ink + contrast ───────────────────────────────────────────
{
    const { browser, page } = await boot({ colorScheme: "dark" });
    await expand(page, 0);
    out["4_dark"] = await page.evaluate(() => {
        const art = document.querySelectorAll('[role="article"]')[0];
        const pill = art.querySelector("span.rounded-full.truncate");
        const csPill = getComputedStyle(pill);
        // walk up for the first non-transparent background
        let el = pill, bg = "rgba(0, 0, 0, 0)";
        while (el && (bg === "rgba(0, 0, 0, 0)" || bg === "transparent")) { bg = getComputedStyle(el).backgroundColor; el = el.parentElement; }
        const rule = art.querySelector(".border-t");
        return {
            pillColor: csPill.color, pillBorder: csPill.borderTopColor,
            resolvedBg: bg,
            firstDotColor: getComputedStyle(art.querySelector('[data-testid="watercolor-swatch"]')).backgroundColor,
            ruleColor: rule && getComputedStyle(rule).borderTopColor,
        };
    });
    out["4_contrast"] = {
        pillVsBg: CR(out["4_dark"].pillColor, out["4_dark"].resolvedBg),
    };
    await page.screenshot({ path: "docs/tranches/V/megatranche/audit/components/PaletteCardSwatches/shot-dark-expanded.png" });
    await browser.close();
}

// ── 5. forced colors ──────────────────────────────────────────────────────
{
    const { browser, page } = await boot({ forcedColors: "active" });
    await expand(page, 0);
    out["5_forced"] = await page.evaluate(() => {
        const art = document.querySelectorAll('[role="article"]')[0];
        const dots = [...art.querySelectorAll('[data-testid="watercolor-swatch"]')];
        return {
            dotBgs: dots.map((d) => getComputedStyle(d).backgroundColor),
            distinctBgs: new Set(dots.map((d) => getComputedStyle(d).backgroundColor)).size,
            pillColor: getComputedStyle(art.querySelector("span.rounded-full.truncate")).color,
            ruleWidth: getComputedStyle(art.querySelector(".border-t")).borderTopWidth,
            forcedColorAdjust: dots[0] && getComputedStyle(dots[0]).forcedColorAdjust,
        };
    });
    await page.screenshot({ path: "docs/tranches/V/megatranche/audit/components/PaletteCardSwatches/shot-forced-colors-expanded.png" });
    await browser.close();
}

// ── 6. reduced motion — expand transition + press scale ───────────────────
{
    const { browser, page } = await boot({ reducedMotion: "reduce" });
    await expand(page, 0);
    out["6_prm"] = await page.evaluate(() => {
        const art = document.querySelectorAll('[role="article"]')[0];
        const btn = art.querySelector('button[aria-label^="Copy slug"]');
        const cs = btn && getComputedStyle(btn);
        return {
            prmMatches: matchMedia("(prefers-reduced-motion: reduce)").matches,
            copyBtnTransition: cs && `${cs.transitionProperty} / ${cs.transitionDuration}`,
            // the height transition is JS-driven (useHeightTransition)
            panelStyleAttr: (() => {
                const p = [...art.querySelectorAll("div")].find((d) => d.className.includes("flex-wrap") && d.className.includes("px-3"));
                return p && p.parentElement.getAttribute("style");
            })(),
        };
    });
    await browser.close();
}

console.log(JSON.stringify(out, null, 2));

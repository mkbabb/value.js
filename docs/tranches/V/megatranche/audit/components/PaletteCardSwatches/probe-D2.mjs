// CHALLENGE-D probe D2 — the Browse route (slug row VISIBLE) with the palette
// API intercepted client-side. No real network, no repo/server mutation.
import { webkit } from "playwright";

// NOTE: the LAN origin (not `localhost`) is deliberate — `initApiEnvironment`
// (demo/platform/transport/availability.ts:70-80) latches `misconfigured` and
// short-circuits every fetch on a LOOPBACK page origin, so no request is ever
// issued and no interception is possible from `localhost`.
const ORIGIN = "http://192.168.1.166:9000";
const now = new Date().toISOString();

const mkRemote = (name, slug, cssList, userSlug, extra = {}) => ({
    name, slug, userSlug,
    colors: cssList.map((css, position) => ({ css, position })),
    createdAt: now, updatedAt: now,
    isLocal: false,
    visibility: "public", tier: "standard", published: true,
    voteCount: 3, versionCount: 2, forkCount: 1,
    ...extra,
});

const PAGE = {
    data: [
        mkRemote("Deep Ocean", "deep-ocean",
            ["#12314f", "#173d5c", "#3a8296", "#7fc6c1", "#e8f3ef"], "mbabb",
            { tags: ["warm", "test", "alpha"] }),
        mkRemote("Nothing Here", "nothing-here", [], "zed"),
        mkRemote("Long Handle", "long-handle", ["#c33", "#3c3", "#33c"],
            "a-very-long-user-slug-that-truncates"),
        mkRemote("Twenty Four", "twenty-four",
            Array.from({ length: 24 }, (_, i) => `hsl(${i * 15} 70% 55%)`), "mbabb"),
    ],
    nextCursor: null,
    hasMore: false,
};

async function boot({ width, height, hasTouch, isMobile, colorScheme }) {
    const browser = await webkit.launch();
    const ctx = await browser.newContext({
        viewport: { width, height },
        hasTouch: !!hasTouch, isMobile: !!isMobile,
        colorScheme: colorScheme ?? "light",
        deviceScaleFactor: 2,
    });
    const page = await ctx.newPage();
    const seen = [];
    page.on("requestfailed", (r) => seen.push("FAIL " + r.url()));
    await page.route("**://localhost:3000/**", async (route) => {
        const u = route.request().url();
        seen.push(u);
        if (u.includes("/palettes?")) {
            return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(PAGE) });
        }
        return route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
    });
    await page.goto(`${ORIGIN}/#/browse`, { waitUntil: "load" });
    await page.waitForTimeout(3500);
    return { browser, page, seen };
}

const out = {};

// ── A. desktop / hover-capable ────────────────────────────────────────────
{
    const { browser, page, seen } = await boot({ width: 1440, height: 900 });
    out.A_reqs = seen.slice(0, 8);
    out.A_bodyText = (await page.locator("body").innerText()).slice(0, 400);
    const cards = page.locator('[role="article"]');
    out.A_cardCount = await cards.count();
    // expand card 0 by clicking its metadata row (not a nested control)
    await cards.first().click({ position: { x: 260, y: 70 } }).catch(() => {});
    await page.waitForTimeout(900);

    out.A_expanded = await page.evaluate(() => {
        const art = document.querySelectorAll('[role="article"]')[0];
        if (!art) return null;
        const slugPill = art.querySelector("span.rounded-full.truncate");
        const copyBtn = art.querySelector('button[aria-label^="Copy slug"]');
        const r = (el) => { const b = el.getBoundingClientRect(); return { w: +b.width.toFixed(2), h: +b.height.toFixed(2), x: +b.x.toFixed(1), y: +b.y.toFixed(1) }; };
        const cs = (el, ks) => Object.fromEntries(ks.map((k) => [k, getComputedStyle(el)[k]]));
        const slugRow = slugPill && slugPill.parentElement;
        const dots = [...art.querySelectorAll('[data-testid="watercolor-swatch"]')];
        const focusables = [...art.querySelectorAll('a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])')];
        return {
            slugPill: slugPill && {
                text: slugPill.textContent.trim(), ...r(slugPill),
                ...cs(slugPill, ["color", "borderTopColor", "fontFamily", "fontSize", "fontWeight", "maxWidth", "letterSpacing"]),
                truncating: slugPill.scrollWidth > slugPill.clientWidth,
            },
            copyBtn: copyBtn && {
                ...r(copyBtn),
                ...cs(copyBtn, ["padding", "transitionProperty", "transitionDuration", "transitionTimingFunction"]),
                iconBox: r(copyBtn.querySelector("svg")),
            },
            slugRow: slugRow && { cls: slugRow.className, ...r(slugRow), ...cs(slugRow, ["paddingTop", "paddingLeft", "paddingRight", "paddingBottom", "gap", "borderTopWidth", "alignItems"]) },
            dotCount: dots.length,
            focusables: focusables.map((f) => f.getAttribute("aria-label") || (f.textContent || "").trim().slice(0, 20)),
            // rhythm: distance from the meta row bottom to the slug row top
            cardRect: r(art),
        };
    });

    // hover a dot → does the teleported floating panel appear, and where?
    const dot = page.locator('[role="article"]').first().locator('[data-testid="watercolor-swatch"]').first();
    await dot.hover().catch(() => {});
    await page.waitForTimeout(500);
    out.A_hoverPanel = await page.evaluate(() => {
        const p = document.querySelector("body > .floating-panel");
        if (!p) return null;
        const b = p.getBoundingClientRect();
        const btns = [...p.querySelectorAll("button")];
        return {
            ariaHidden: p.getAttribute("aria-hidden"),
            rect: { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) },
            transform: getComputedStyle(p).transform,
            btnCount: btns.length,
            btnLabels: btns.map((x) => x.getAttribute("aria-label")),
            btnFocusable: btns.map((x) => x.tabIndex),
            btnTransition: btns[0] && {
                property: getComputedStyle(btns[0]).transitionProperty,
                duration: getComputedStyle(btns[0]).transitionDuration,
            },
            insideAriaHidden: !!p.closest('[aria-hidden="true"]'),
            animationName: getComputedStyle(p).animationName,
            opacity: getComputedStyle(p).opacity,
        };
    });

    // keyboard: tab from the card and see whether any swatch/action is reachable
    out.A_tabOrder = await page.evaluate(async () => {
        const seq = [];
        const art = document.querySelectorAll('[role="article"]')[0];
        if (!art) return null;
        const all = [...document.querySelectorAll('a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])')]
            .filter((e) => e.offsetParent !== null || e.getClientRects().length);
        for (const e of all) {
            if (art.contains(e)) seq.push(e.getAttribute("aria-label") || (e.textContent || "").trim().slice(0, 24) || e.tagName);
        }
        return seq;
    });

    await page.screenshot({ path: "docs/tranches/V/megatranche/audit/components/PaletteCardSwatches/shot-browse-desktop-light-expanded.png" });
    await browser.close();
}

// ── B. touch / no-hover ───────────────────────────────────────────────────
{
    const { browser, page, seen } = await boot({ width: 390, height: 844, hasTouch: true, isMobile: true });
    out.B_reqs = seen.slice(0, 8);
    const cards = page.locator('[role="article"]');
    out.B_cardCount = await cards.count();
    await cards.first().tap({ position: { x: 120, y: 70 } }).catch((e) => { out.B_tapErr = String(e).slice(0, 120); });
    await page.waitForTimeout(900);
    out.B_dotCount = await page.evaluate(() => document.querySelectorAll('[role="article"] [data-testid="watercolor-swatch"]').length);

    // tap the first dot in the expanded panel — the ONLY documented touch route
    // to add/edit/copy a color.
    const dotBox = await page.evaluate(() => {
        const art = document.querySelectorAll('[role="article"]')[0];
        const d = art && art.querySelectorAll('[data-testid="watercolor-swatch"]')[0];
        if (!d) return null;
        const b = d.getBoundingClientRect();
        return { x: b.x + b.width / 2, y: b.y + b.height / 2, w: b.width, pe: getComputedStyle(d).pointerEvents };
    });
    out.B_dotBox = dotBox;
    if (dotBox) {
        await page.touchscreen.tap(dotBox.x, dotBox.y);
        await page.waitForTimeout(700);
    }
    out.B_afterTap = await page.evaluate(() => ({
        popoverContent: document.querySelectorAll('[data-reka-popper-content-wrapper], [data-radix-popper-content-wrapper]').length,
        anyPopoverRole: document.querySelectorAll('[role="dialog"]').length,
        floatingPanels: document.querySelectorAll("body > .floating-panel").length,
        addBtns: document.querySelectorAll('button[aria-label^="Add "]').length,
        editBtns: document.querySelectorAll('button[aria-label^="Edit color"]').length,
        // what element is actually at the dot's centre point?
    }));
    if (dotBox) {
        out.B_elementAtDotCentre = await page.evaluate(([x, y]) => {
            const e = document.elementFromPoint(x, y);
            return e && { tag: e.tagName, cls: (e.className || "").toString().slice(0, 80), testid: e.getAttribute("data-testid") };
        }, [dotBox.x, dotBox.y]);
    }
    await page.screenshot({ path: "docs/tranches/V/megatranche/audit/components/PaletteCardSwatches/shot-browse-mobile-light-expanded.png" });
    await browser.close();
}

console.log(JSON.stringify(out, null, 2));

// CHALLENGE-D probe D5 — branch selection truth + whether the swatch is an
// operable control on either branch.
import { webkit } from "playwright";

const ORIGIN = "http://192.168.1.166:9000";
const now = new Date().toISOString();
const P = {
    data: [{
        name: "Deep Ocean", slug: "deep-ocean", userSlug: "mbabb",
        colors: ["#12314f", "#173d5c", "#3a8296"].map((css, position) => ({ css, position })),
        createdAt: now, updatedAt: now, isLocal: false,
        visibility: "public", tier: "standard", published: true, voteCount: 3,
    }],
    nextCursor: null, hasMore: false,
};

async function boot(o = {}) {
    const browser = await webkit.launch();
    const ctx = await browser.newContext({
        viewport: { width: o.width ?? 1440, height: o.height ?? 900 },
        hasTouch: !!o.hasTouch, isMobile: !!o.isMobile,
        colorScheme: "light", deviceScaleFactor: 2,
    });
    const page = await ctx.newPage();
    await page.route("**://localhost:3000/**", (r) => {
        const u = r.request().url();
        if (u.includes("/palettes?")) return r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(P) });
        return r.fulfill({ status: 200, contentType: "application/json", body: "{}" });
    });
    await page.goto(`${ORIGIN}/#/browse`, { waitUntil: "load" });
    await page.waitForTimeout(3200);
    await page.evaluate(() => document.querySelector('[role="article"]').click());
    await page.waitForTimeout(900);
    return { browser, page };
}

const probeDom = () => {
    const art = document.querySelector('[role="article"]');
    const d0 = art.querySelector('[data-testid="watercolor-swatch"]');
    const wrap = d0 && d0.parentElement;
    return {
        mq: {
            hoverHover: matchMedia("(hover: hover)").matches,
            pointerCoarse: matchMedia("(pointer: coarse)").matches,
        },
        // reka Popover marks its trigger with aria-haspopup + data-state
        triggerMarkers: wrap ? {
            wrapAttrs: [...wrap.attributes].map((a) => `${a.name}=${a.value}`.slice(0, 60)),
            dotAttrs: [...d0.attributes].map((a) => `${a.name}`),
            anyHasPopup: !!art.querySelector("[aria-haspopup]"),
            anyDataState: [...art.querySelectorAll("[data-state]")].map((e) => e.tagName + ":" + e.getAttribute("data-state")),
        } : null,
        dotPointerEvents: d0 && getComputedStyle(d0).pointerEvents,
        elementAtDotCentre: (() => {
            const b = d0.getBoundingClientRect();
            const e = document.elementFromPoint(b.x + b.width / 2, b.y + b.height / 2);
            return e && `${e.tagName}.${(e.className || "").toString().split(" ")[0]}`;
        })(),
    };
};

const out = {};

// desktop, hover-capable
{
    const { browser, page } = await boot();
    out.desktop = await page.evaluate(probeDom);
    // CLICK the dot (via its wrapper's centre) and see whether the panel toggles
    const b = await page.evaluate(() => {
        const d = document.querySelector('[role="article"] [data-testid="watercolor-swatch"]');
        const r = d.getBoundingClientRect();
        return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
    });
    await page.mouse.move(b.x, b.y, { steps: 5 });
    await page.waitForTimeout(400);
    out.desktop_afterHover = await page.evaluate(() => ({ panels: document.querySelectorAll("body > .floating-panel").length }));
    // move away, let the 250ms leave-timer close, then CLICK without hovering first
    await page.mouse.move(10, 10, { steps: 5 });
    await page.waitForTimeout(700);
    out.desktop_afterLeave = await page.evaluate(() => ({ panels: document.querySelectorAll("body > .floating-panel").length }));
    await page.mouse.click(b.x, b.y);
    await page.waitForTimeout(400);
    out.desktop_afterClick = await page.evaluate(() => {
        const p = document.querySelector("body > .floating-panel");
        return { panels: p ? 1 : 0, rect: p && (() => { const r = p.getBoundingClientRect(); return { x: +r.x.toFixed(0), y: +r.y.toFixed(0), w: +r.width.toFixed(0), h: +r.height.toFixed(0) }; })() };
    });
    // and did the card COLLAPSE instead (the click bubbling to the card root)?
    out.desktop_cardAfterClick = await page.evaluate(() => {
        const a = document.querySelector('[role="article"]');
        return { h: +a.getBoundingClientRect().height.toFixed(1), dots: a.querySelectorAll('[data-testid="watercolor-swatch"]').length };
    });
    await browser.close();
}

// mobile / touch
{
    const { browser, page } = await boot({ width: 390, height: 844, hasTouch: true, isMobile: true });
    out.mobile = await page.evaluate(probeDom);
    const b = await page.evaluate(() => {
        const d = document.querySelector('[role="article"] [data-testid="watercolor-swatch"]');
        const r = d.getBoundingClientRect();
        return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
    });
    await page.touchscreen.tap(b.x, b.y);
    await page.waitForTimeout(700);
    out.mobile_afterTap = await page.evaluate(() => ({
        dialogs: document.querySelectorAll('[role="dialog"]').length,
        popperWrappers: document.querySelectorAll("[data-reka-popper-content-wrapper]").length,
        floating: document.querySelectorAll("body > .floating-panel").length,
        actionButtons: document.querySelectorAll('button[aria-label^="Edit color"],button[aria-label^="Copy color"],button[aria-label^="Add "]').length,
        cardH: +document.querySelector('[role="article"]').getBoundingClientRect().height.toFixed(1),
    }));
    await browser.close();
}

console.log(JSON.stringify(out, null, 2));

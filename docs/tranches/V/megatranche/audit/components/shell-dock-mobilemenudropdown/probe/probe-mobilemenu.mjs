import { chromium } from "playwright";

const out = {};
const browser = await chromium.launch();
const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
});
const page = await ctx.newPage();
const errs = [];
page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
page.on("pageerror", (e) => errs.push("PAGEERROR " + e.message));

await page.goto("http://localhost:9000/#/", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);

out.viewport = page.viewportSize();

// 1. dev-graph cost of the glass-ui ROOT barrel vs subpaths
out.glassChunks = await page.evaluate(() =>
    performance
        .getEntriesByType("resource")
        .filter((e) => /glass-ui/.test(e.name))
        .map((e) => ({
            n: (e.name.split("/deps/")[1] || e.name.split("/").pop()).split("?")[0],
            bytes: e.transferSize || e.encodedBodySize,
            startMs: Math.round(e.startTime),
        }))
        .sort((a, b) => b.bytes - a.bytes),
);

// 2. the trigger, closed
out.triggerClosed = await page.evaluate(() => {
    const el = document.querySelector('button[aria-label="Menu"]');
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
        cls: el.className,
        type: el.getAttribute("type"),
        ariaLabel: el.getAttribute("aria-label"),
        ariaHasPopup: el.getAttribute("aria-haspopup"),
        ariaExpanded: el.getAttribute("aria-expanded"),
        w: +r.width.toFixed(1),
        h: +r.height.toFixed(1),
        minW: cs.minWidth,
        minH: cs.minHeight,
    };
});

// 3. open by TAP (touch), the real mobile gesture
await page.locator('button[aria-label="Menu"]').tap();
await page.waitForTimeout(600);

out.afterTapHash = await page.evaluate(() => location.hash);
out.menuOpen = await page.evaluate(() => !!document.querySelector('[role="menu"]'));

out.menu = await page.evaluate(() => {
    const menu = document.querySelector('[role="menu"]');
    if (!menu) return null;
    const mr = menu.getBoundingClientRect();
    const rows = [...menu.querySelectorAll('[role="menuitem"]')].map((el) => {
        const r = el.getBoundingClientRect();
        return {
            txt: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 28),
            w: +r.width.toFixed(1),
            h: +r.height.toFixed(1),
            y: +r.y.toFixed(1),
        };
    });
    const links = [...menu.querySelectorAll("a")].map((el) => {
        const r = el.getBoundingClientRect();
        return {
            href: el.getAttribute("href"),
            txt: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 20),
            w: +r.width.toFixed(1),
            h: +r.height.toFixed(1),
        };
    });
    const img = menu.querySelector("img");
    return {
        rect: {
            x: +mr.x.toFixed(1),
            y: +mr.y.toFixed(1),
            w: +mr.width.toFixed(1),
            h: +mr.height.toFixed(1),
            right: +mr.right.toFixed(1),
            bottom: +mr.bottom.toFixed(1),
        },
        viewportH: window.innerHeight,
        overflowsBottom: mr.bottom > window.innerHeight,
        rows,
        links,
        avatarImg: img
            ? { src: img.getAttribute("src"), alt: img.getAttribute("alt"), complete: img.complete, nw: img.naturalWidth }
            : null,
        // is the menu portaled out of the dock subtree?
        portalHost: (() => {
            let n = menu;
            while (n.parentElement && n.parentElement !== document.body) n = n.parentElement;
            return n.parentElement === document.body ? n.tagName + "." + (n.className || "") : "notBody";
        })(),
    };
});

// 4. dark toggle: does one activation flip exactly once?
out.darkBefore = await page.evaluate(() => document.documentElement.classList.contains("dark"));
const darkRow = page.locator('[role="menu"] [role="menuitem"]', { hasText: "Dark mode" });
if (await darkRow.count()) {
    await darkRow.first().tap();
    await page.waitForTimeout(500);
}
out.darkAfter = await page.evaluate(() => document.documentElement.classList.contains("dark"));
out.menuOpenAfterDark = await page.evaluate(() => !!document.querySelector('[role="menu"]'));

// 5. nameless-button census, mobile
out.namelessButtons = await page.evaluate(() =>
    [...document.querySelectorAll("button")]
        .filter((b) => {
            const r = b.getBoundingClientRect();
            if (r.width === 0 || r.height === 0) return false;
            const n = (b.getAttribute("aria-label") || b.getAttribute("title") || b.textContent || "").trim();
            return !n;
        })
        .map((b) => ({ cls: b.className, w: Math.round(b.getBoundingClientRect().width) })),
);

out.consoleErrors = errs;

await page.screenshot({ path: "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/mobilemenu-open.png" });
await browser.close();
console.log(JSON.stringify(out, null, 2));

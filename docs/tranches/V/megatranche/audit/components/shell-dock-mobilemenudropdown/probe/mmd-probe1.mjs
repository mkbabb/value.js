// mmd-probe1 — MobileMenuDropdown a11y + geometry at mobile, coarse pointer.
// Read-only against http://localhost:9000
import { chromium } from "playwright";

const ctxOpts = {
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
};

const browser = await chromium.launch();
const ctx = await browser.newContext(ctxOpts);
const page = await ctx.newPage();
const consoleErrs = [];
const pageErrs = [];
page.on("console", (m) => { if (m.type() === "error") consoleErrs.push(m.text()); });
page.on("pageerror", (e) => pageErrs.push(String(e)));

await page.goto("http://localhost:9000/#/", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

const trigBefore = await page.evaluate(() => {
    const t = document.querySelector('[aria-label="Menu"]');
    if (!t) return null;
    const r = t.getBoundingClientRect();
    const cs = getComputedStyle(t);
    const after = getComputedStyle(t, "::after");
    return {
        tag: t.tagName, cls: t.className,
        rect: [Math.round(r.width), Math.round(r.height)],
        display: cs.display, minH: cs.minHeight,
        role: t.getAttribute("role"), type: t.getAttribute("type"),
        ariaHasPopup: t.getAttribute("aria-haspopup"),
        ariaExpanded: t.getAttribute("aria-expanded"),
        ariaControls: t.getAttribute("aria-controls"),
        afterContent: after.content,
        afterW: after.inlineSize || after.width,
        afterH: after.blockSize || after.height,
        coarse: matchMedia("(pointer: coarse)").matches,
    };
});
console.log("TRIGGER(closed) =", JSON.stringify(trigBefore));

await page.locator('[aria-label="Menu"]').tap();
await page.waitForTimeout(500);

const dump = await page.evaluate(() => {
    const t = document.querySelector('[aria-label="Menu"]');
    const content = document.querySelector('[role="menu"]');
    const out = { triggerExpanded: t?.getAttribute("aria-expanded"), menu: null, items: [], imgs: [] };
    if (content) {
        const r = content.getBoundingClientRect();
        out.menu = {
            id: content.id,
            role: content.getAttribute("role"),
            ariaLabel: content.getAttribute("aria-label"),
            ariaLabelledby: content.getAttribute("aria-labelledby"),
            labelledByResolves: content.getAttribute("aria-labelledby")
                ? !!document.getElementById(content.getAttribute("aria-labelledby")) : null,
            rect: [Math.round(r.width), Math.round(r.height), Math.round(r.x), Math.round(r.y)],
            overflowRight: Math.round(r.right - document.documentElement.clientWidth),
        };
        for (const el of content.querySelectorAll("*")) {
            const role = el.getAttribute("role");
            if (!role) continue;
            const r = el.getBoundingClientRect();
            out.items.push({
                role,
                text: (el.textContent || "").trim().slice(0, 40),
                ariaChecked: el.getAttribute("aria-checked"),
                ariaPressed: el.getAttribute("aria-pressed"),
                ariaLabel: el.getAttribute("aria-label"),
                tabindex: el.getAttribute("tabindex"),
                rect: [Math.round(r.width), Math.round(r.height)],
                tag: el.tagName,
            });
        }
        for (const img of content.querySelectorAll("img")) {
            out.imgs.push({
                src: img.getAttribute("src")?.slice(0, 60),
                alt: img.getAttribute("alt"),
                loading: img.getAttribute("loading"),
                complete: img.complete, naturalW: img.naturalWidth,
                role: img.getAttribute("role"),
                ariaHidden: img.getAttribute("aria-hidden"),
            });
        }
        // anchors (as-child items)
        out.anchors = [...content.querySelectorAll("a")].map((a) => ({
            href: a.getAttribute("href"), text: (a.textContent || "").trim().slice(0, 30),
            role: a.getAttribute("role"), tabindex: a.getAttribute("tabindex"),
        }));
    }
    out.activeElement = document.activeElement
        ? `${document.activeElement.tagName}.${document.activeElement.className}`.slice(0, 80)
        : null;
    // separator census
    out.separators = document.querySelectorAll('[role="menu"] [role="separator"], [role="menu"] [data-slot="dropdown-menu-separator"]').length;
    return out;
});
console.log("OPEN DUMP =", JSON.stringify(dump, null, 1));

await page.screenshot({ path: new URL("./shot-mobile-menu-open.png", import.meta.url).pathname });

console.log("consoleErrs =", JSON.stringify(consoleErrs.slice(0, 8)));
console.log("pageErrs =", JSON.stringify(pageErrs.slice(0, 8)));

await browser.close();

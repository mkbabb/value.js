// CHALLENGE-C r3 · probe C7 — panel legibility (what the screenshot shows), the
// missing per-filter undo, and the `type` audit of every button in the panel.
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const EV = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/SearchFilterBar/evidence";
const ORIGIN = "http://localhost:9000";

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
const page = await context.newPage();
const out = {};
await page.goto(ORIGIN + "/#/browse", { waitUntil: "networkidle", timeout: 45000 });
await page.waitForTimeout(2500);

await page.locator('button[aria-label="Filters"]').click();
await page.waitForTimeout(900);

// --- panel material: is the panel opaque enough to sit on top of live text?
out.material = await page.evaluate(() => {
    const c = document.querySelector("[data-reka-popper-content-wrapper]")?.firstElementChild;
    if (!c) return null;
    const s = getComputedStyle(c);
    const r = c.getBoundingClientRect();
    // what page content is underneath the panel's rect?
    const under = [];
    for (const el of document.querySelectorAll("h2,h3,p,button,span,div")) {
        if (c.contains(el)) continue;
        const er = el.getBoundingClientRect();
        if (er.width === 0 || er.height === 0) continue;
        const overlap =
            er.left < r.right && er.right > r.left && er.top < r.bottom && er.bottom > r.top;
        const text = (el.textContent ?? "").trim();
        if (overlap && text && text.length < 60 && el.children.length === 0) {
            under.push({ tag: el.tagName, text, rect: { t: +er.top.toFixed(0), l: +er.left.toFixed(0) } });
        }
    }
    return {
        backgroundColor: s.backgroundColor,
        backgroundImage: s.backgroundImage.slice(0, 120),
        backdropFilter: s.backdropFilter,
        opacity: s.opacity,
        isolation: s.isolation,
        rect: { t: +r.top.toFixed(1), l: +r.left.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) },
        underneath: under.slice(0, 10),
    };
});

// --- type audit of every button inside the panel
out.buttonTypes = await page.evaluate(() => {
    const c = document.querySelector("[data-reka-popper-content-wrapper]")?.firstElementChild;
    return [...(c?.querySelectorAll("button") ?? [])].map((b) => ({
        name: (b.getAttribute("aria-label") ?? b.textContent.trim()).slice(0, 48),
        role: b.getAttribute("role"),
        typeAttr: b.getAttribute("type"),
        typeProp: b.type,
        rect: (({ width, height }) => ({ w: +width.toFixed(1), h: +height.toFixed(1) }))(b.getBoundingClientRect()),
    }));
});

await page.screenshot({ path: `${EV}/C-r3-panel-over-live-text.png`, clip: { x: 200, y: 330, width: 700, height: 560 } });

// --- the undo question: search, then try to undo WITHOUT "Clear all filters"
const input = page.locator('input[aria-label="Search by CSS color"]').first();
await input.click();
await input.fill("#ff0000");
await page.locator("button", { hasText: /^Search$/ }).first().click();
await page.waitForTimeout(600);
const readBadge = () =>
    page.evaluate(() => {
        const t = document.querySelector('button[aria-label="Filters"]');
        const c = document.querySelector("[data-reka-popper-content-wrapper]")?.firstElementChild;
        return {
            badge: t?.querySelector("span")?.textContent.trim() ?? "",
            inputValue: c?.querySelector("input")?.value ?? null,
            clearAllPresent: !![...(c?.querySelectorAll("button") ?? [])].find((b) => /Clear all/i.test(b.textContent)),
            controlsNamed: [...(c?.querySelectorAll("button") ?? [])].map((b) =>
                (b.getAttribute("aria-label") ?? b.textContent.trim()).slice(0, 30),
            ),
        };
    });
out.afterSearch = await readBadge();
await input.fill("");
await page.waitForTimeout(400);
out.afterEmptyingField = await readBadge();
// press Enter on an empty field — what happens?
await input.press("Enter");
await page.waitForTimeout(500);
out.afterEnterOnEmpty = await readBadge();

// --- reduced-motion: does the (unreachable) spinner respect PRM?
out.prm = await page.evaluate(() => {
    const probe = document.createElement("div");
    probe.className = "animate-spin";
    document.body.appendChild(probe);
    const s = getComputedStyle(probe);
    const v = { animationName: s.animationName, animationDuration: s.animationDuration };
    probe.remove();
    return v;
});

writeFileSync(`${EV}/probeC7-r3.json`, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
await browser.close();

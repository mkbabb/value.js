// IDZ probe 8 — (a) does `scale-[1.01]` actually render? (b) which element does
// the e2e Extract assertion resolve to? (c) a11y of the zone in both states.
import { chromium } from "playwright";
import { makePng } from "./idz-probe1.mjs";

const ZONE = '[role="button"][aria-label*="image" i]';
const out = {};
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:9000/#/extract", { waitUntil: "load" });
await page.waitForTimeout(2400);

// (a) the dragging branch's geometry token, read on the RIGHT property
out.scaleProbe = await page.evaluate((s) => {
    const z = document.querySelector(s);
    const before = { scale: getComputedStyle(z).scale, transform: getComputedStyle(z).transform };
    z.classList.add("scale-[1.01]");
    const after = { scale: getComputedStyle(z).scale, transform: getComputedStyle(z).transform };
    z.classList.remove("scale-[1.01]");
    return { before, after };
}, ZONE);

// (b) the e2e locator: role=button, name /Upload image/i — how many, and which?
const loc = page.getByRole("button", { name: /Upload image/i });
out.e2eLocator = {
    count: await loc.count(),
    all: await loc.evaluateAll((els) =>
        els.map((e) => ({
            tag: e.tagName,
            name: e.getAttribute("aria-label") ?? e.getAttribute("title"),
            isDropZone: e.querySelector('input[type=file]') !== null,
        })),
    ),
};
out.e2eLastIsDropZone = out.e2eLocator.all.at(-1)?.isDropZone;

// (c) a11y snapshot of the zone, empty then developed
const zoneA11y = () =>
    page.evaluate((s) => {
        const z = document.querySelector(s);
        const r = z.getBoundingClientRect();
        return {
            role: z.getAttribute("role"),
            tabIndex: z.tabIndex,
            ariaLabel: z.getAttribute("aria-label"),
            w: Math.round(r.width), h: Math.round(r.height),
            focusable: (() => { z.focus(); return document.activeElement === z; })(),
            cursor: getComputedStyle(z).cursor,
            liveRegions: [...z.querySelectorAll("[aria-live]")].length,
        };
    }, ZONE);
out.emptyState = await zoneA11y();

await page.setInputFiles('input[type=file]', {
    name: "red.png", mimeType: "image/png", buffer: makePng(64, 64, [220, 40, 40]),
});
await page.waitForTimeout(2400);
out.developedState = await zoneA11y();

// (d) keyboard: can a keyboard user reach/operate the zone once developed?
out.keyboard = await page.evaluate((s) => {
    const z = document.querySelector(s);
    let opened = false;
    z.querySelector("input[type=file]").addEventListener("click", () => (opened = true));
    z.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    z.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true }));
    return { pickerOpenedByKeyboard: opened, tabIndex: z.tabIndex };
}, ZONE);

console.log(JSON.stringify(out, null, 2));
await browser.close();

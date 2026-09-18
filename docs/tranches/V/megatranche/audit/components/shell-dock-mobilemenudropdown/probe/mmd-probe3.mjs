// mmd-probe3 — (a) the as-child failure on the GitHub row, (b) keyboard
// activation of that row, (c) the breakpoint-orphan, (d) startSlugEdit focus.
import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/", { waitUntil: "networkidle" });
await page.waitForTimeout(1200);

// ── (a) DOM shape of the GitHub row ──────────────────────────────────────────
await page.locator('[aria-label="Menu"]').tap();
await page.waitForTimeout(400);
const shape = await page.evaluate(() => {
    const menu = document.querySelector('[role="menu"]');
    const gh = [...menu.querySelectorAll('[role="menuitem"]')].find((e) => e.textContent.includes("GitHub"));
    return {
        outerHTMLHead: gh.outerHTML.slice(0, 260),
        tag: gh.tagName,
        attrs: [...gh.attributes].map((a) => `${a.name}=${a.value}`.slice(0, 60)),
        childAnchor: !!gh.querySelector("a[href]"),
        anchorTabIndex: gh.querySelector("a[href]")?.tabIndex,
    };
});
console.log("(a) GITHUB ROW =", JSON.stringify(shape, null, 1));

// ── (b) keyboard activation: ArrowDown to GitHub, press Enter ────────────────
let popups = 0;
ctx.on("page", () => { popups++; });
const urlBefore = page.url();
await page.keyboard.press("ArrowDown"); // Login
await page.keyboard.press("ArrowDown"); // Share color
await page.keyboard.press("ArrowDown"); // GitHub
await page.waitForTimeout(150);
const focused = await page.evaluate(() => (document.activeElement.textContent || "").trim().slice(0, 20));
await page.keyboard.press("Enter");
await page.waitForTimeout(900);
console.log("(b) focusedRow =", JSON.stringify(focused),
    "| popupsOpened =", popups,
    "| urlChanged =", page.url() !== urlBefore,
    "| menuStillOpen =", await page.evaluate(() => !!document.querySelector('[role="menu"]')));

// mouse/tap activation for contrast
await page.locator('[aria-label="Menu"]').tap();
await page.waitForTimeout(400);
const before2 = popups;
await page.locator('[role="menu"] a[href="https://github.com/mkbabb/value.js"]').click({ force: true });
await page.waitForTimeout(900);
console.log("(b') tapActivation popups =", popups - before2);

// ── (c) breakpoint orphan: open at 390, resize to 1440 while open ────────────
await page.setViewportSize({ width: 390, height: 844 });
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(1200);
await page.locator('[aria-label="Menu"]').tap();
await page.waitForTimeout(400);
const openMobile = await page.evaluate(() => !!document.querySelector('[role="menu"]'));
await page.setViewportSize({ width: 1440, height: 900 });
await page.waitForTimeout(700);
const orphan = await page.evaluate(() => {
    const menu = document.querySelector('[role="menu"]');
    const trig = document.querySelector('[aria-label="Menu"]');
    const tcs = trig ? getComputedStyle(trig) : null;
    const twrap = trig?.closest("div.lg\\:hidden") ?? trig?.parentElement;
    const r = menu?.getBoundingClientRect();
    return {
        menuStillMounted: !!menu,
        menuRect: r ? [Math.round(r.width), Math.round(r.height), Math.round(r.x), Math.round(r.y)] : null,
        menuVisible: menu ? getComputedStyle(menu).visibility : null,
        menuOpacity: menu ? getComputedStyle(menu).opacity : null,
        triggerDisplay: tcs?.display ?? null,
        triggerWrapperDisplay: twrap ? getComputedStyle(twrap).display : null,
        triggerRect: trig ? (() => { const q = trig.getBoundingClientRect(); return [Math.round(q.width), Math.round(q.height)]; })() : null,
        activeElement: document.activeElement ? `${document.activeElement.tagName}.${(document.activeElement.className || "").toString().slice(0, 40)}` : null,
    };
});
console.log("(c) openAtMobile =", openMobile, "| AFTER RESIZE TO 1440 =", JSON.stringify(orphan, null, 1));

// close it and see where focus lands
await page.keyboard.press("Escape");
await page.waitForTimeout(400);
console.log("(c') afterEscape activeElement =", await page.evaluate(() => {
    const a = document.activeElement;
    return a ? { tag: a.tagName, cls: (a.className || "").toString().slice(0, 50), isBody: a === document.body, display: getComputedStyle(a).display } : null;
}));

await browser.close();

// mmd-probe2 — keyboard operability inside the mobile menu + the identity-block
// reachability question + item geometry. Read-only.
import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/", { waitUntil: "networkidle" });
await page.waitForTimeout(1200);

// Open with the KEYBOARD (focus trigger, press Enter) — the a11y path.
await page.evaluate(() => document.querySelector('[aria-label="Menu"]').focus());
await page.keyboard.press("Enter");
await page.waitForTimeout(400);

const readActive = () => page.evaluate(() => {
    const a = document.activeElement;
    if (!a) return null;
    return {
        tag: a.tagName,
        role: a.getAttribute("role"),
        text: (a.textContent || "").trim().slice(0, 30),
        cls: (a.className || "").toString().slice(0, 50),
    };
});

console.log("after Enter  ->", JSON.stringify(await readActive()));
const seq = [];
for (let i = 0; i < 8; i++) {
    await page.keyboard.press("ArrowDown");
    await page.waitForTimeout(80);
    seq.push(await readActive());
}
console.log("ArrowDown x8 ->", JSON.stringify(seq.map((s) => s && s.text)));

// Can Tab reach the @mbabb identity link?
const tabSeq = [];
for (let i = 0; i < 4; i++) {
    await page.keyboard.press("Tab");
    await page.waitForTimeout(80);
    tabSeq.push(await readActive());
}
console.log("Tab x4       ->", JSON.stringify(tabSeq.map((s) => s && (s.text || s.tag))));

// Geometry of the two item kinds + the identity block
const geo = await page.evaluate(() => {
    const menu = document.querySelector('[role="menu"]');
    const rows = [...menu.children].map((el) => {
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return {
            tag: el.tagName, role: el.getAttribute("role"),
            text: (el.textContent || "").trim().slice(0, 24),
            rect: [Math.round(r.width), Math.round(r.height)],
            display: cs.display, padding: cs.padding, lineHeight: cs.lineHeight,
            fontSize: cs.fontSize,
        };
    });
    const gh = [...menu.querySelectorAll('[role="menuitem"]')].find((e) => e.textContent.includes("GitHub"));
    const ghcs = gh ? getComputedStyle(gh) : null;
    return {
        rows,
        github: ghcs ? { tag: gh.tagName, display: ghcs.display, padding: ghcs.padding, alignItems: ghcs.alignItems, whiteSpace: ghcs.whiteSpace, height: Math.round(gh.getBoundingClientRect().height) } : null,
    };
});
console.log("ROWS =", JSON.stringify(geo, null, 1));

await browser.close();

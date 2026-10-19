// X-DS value pass 4 · layout probe (V4C-04/05/06/07/08/09) — headless real Chrome (§0ei).
// usage: node probe-layout.mjs [--base http://localhost:9000] [--out dir]
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/@playwright/test/index.mjs";
const args = process.argv.slice(2);
const BASE = args.includes("--base") ? args[args.indexOf("--base") + 1] : "http://localhost:9000";
const OUT = args.includes("--out") ? args[args.indexOf("--out") + 1] : null;
const browser = await chromium.launch({ channel: "chrome", headless: true });
const out = {};
async function open(width, route, theme = "light") {
    const ctx = await browser.newContext({ viewport: { width, height: width <= 500 ? 844 : 900 }, colorScheme: theme });
    await ctx.addInitScript((th) => { try { localStorage.setItem("vueuse-color-scheme", th); } catch {} }, theme);
    const page = await ctx.newPage();
    await page.goto(BASE + "/#" + route, { waitUntil: "load" });
    await page.locator(".pane-wrapper .card").first().waitFor({ timeout: 120000 });
    await page.waitForTimeout(4500);
    return { ctx, page };
}
const box = (sel) => { const e = document.querySelector(sel); if (!e) return null; const r = e.getBoundingClientRect(); return { top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), right: Math.round(r.right), h: Math.round(r.height) }; };
// V4C-04 — the blob config card ends with the row; the footer on screen.
{
    const { ctx, page } = await open(1440, "/blob");
    out.blob = await page.evaluate((boxSrc) => {
        const box = eval(boxSrc);
        const bar = document.querySelector(".config-action-bar");
        const card = bar?.closest(".card");
        const port = card?.querySelector(".pane-scroll-fade");
        const r = (e) => { const b = e.getBoundingClientRect(); return { top: Math.round(b.top), bottom: Math.round(b.bottom) }; };
        return { bar: r(bar), card: r(card), port: port && { ...r(port), scrollH: port.scrollHeight, clientH: port.clientHeight },
            stage: box(".pane-wrapper--stage .card"), docH: document.documentElement.scrollHeight, winH: innerHeight,
            seatedVeil: getComputedStyle(card.querySelector(":scope > .pane-header"), "::before").display };
    }, box.toString());
    await ctx.close();
}
// V4C-06 — header bottom to the first body row, every pane.
out.gap = {};
for (const route of ["/", "/gradient", "/extract", "/mix", "/generate", "/atmosphere", "/palettes", "/browse"]) {
    const { ctx, page } = await open(1440, route);
    out.gap[route] = await page.evaluate(() => Array.from(document.querySelectorAll("main .pane-header")).filter((h) => h.offsetParent).map((h) => {
        const hb = h.querySelector(".pane-header-desc, .pane-header-title:last-child") ?? h;
        const textBottom = hb.getBoundingClientRect().bottom;
        // first visible text/control after the header in document order
        const card = h.closest(".card");
        const walker = document.createTreeWalker(card, NodeFilter.SHOW_ELEMENT);
        let first = null;
        for (let n = walker.nextNode(); n; n = walker.nextNode()) {
            if (h.contains(n)) continue;
            if (!(h.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING)) continue;
            const r = n.getBoundingClientRect();
            if (r.height > 4 && r.width > 4 && n.children.length === 0) { first = { tag: n.tagName, text: (n.textContent || n.getAttribute("aria-label") || "").trim().slice(0, 24), top: Math.round(r.top) }; break; }
        }
        return { title: h.querySelector(".pane-header-title")?.textContent.trim().slice(0, 24), captionBottom: Math.round(textBottom), headerBottom: Math.round(h.getBoundingClientRect().bottom), first, gap: first ? Math.round(first.top - textBottom) : null };
    }));
    if (OUT && route === "/atmosphere") await page.screenshot({ path: `${OUT}/atmosphere-form-1440-light.png` });
    if (route === "/atmosphere") out.aurora = await page.evaluate(() => {
        const trig = Array.from(document.querySelectorAll(".aurora-form [role=combobox]")).map((e) => Math.round(e.getBoundingClientRect().right));
        const well = document.querySelector(".config-console")?.getBoundingClientRect();
        return { triggerRights: trig, wellRight: well && Math.round(well.right) };
    });
    if (route === "/mix") out.mix = await page.evaluate(() => {
        const tabs = document.querySelector("[data-mix-direction] [role=tablist]")?.getBoundingClientRect();
        const title = document.querySelector(".pane-header-title")?.getBoundingClientRect();
        return { tabsLeft: tabs && Math.round(tabs.left), titleLeft: title && Math.round(title.left) };
    });
    await ctx.close();
}
// V4C-09 — at 390 the Generate title row holds its actions.
{
    const { ctx, page } = await open(390, "/generate");
    out.generate390 = await page.evaluate(() => {
        const name = document.querySelector("input[aria-label='Palette name']")?.getBoundingClientRect();
        const regen = Array.from(document.querySelectorAll("button")).find((b) => /Regenerate/.test(b.textContent))?.getBoundingClientRect();
        const copy = document.querySelector("button[aria-label='Copy all colors']")?.getBoundingClientRect();
        const r = (b) => b && { top: Math.round(b.top), bottom: Math.round(b.bottom), left: Math.round(b.left), right: Math.round(b.right) };
        return { name: r(name), regenerate: r(regen), copy: r(copy) };
    });
    if (OUT) await page.screenshot({ path: `${OUT}/generate-row-390-light.png` });
    await ctx.close();
}
await browser.close();
console.log(JSON.stringify(out, null, 1));

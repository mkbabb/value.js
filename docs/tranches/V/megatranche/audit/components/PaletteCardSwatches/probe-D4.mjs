// CHALLENGE-D probe D4 — empty (N=0) + overflow (N=24) expanded states, and a
// CORRECT contrast measurement (canvas-resolved sRGB, not naive oklch parsing).
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
        mk("Nothing Here", "nothing-here", [], "zed"),
        mk("Twenty Four", "twenty-four", Array.from({ length: 24 }, (_, i) => `hsl(${i * 15} 70% 55%)`), "mbabb"),
        mk("Deep Ocean", "deep-ocean", ["#12314f", "#173d5c", "#3a8296", "#7fc6c1", "#e8f3ef"], "mbabb"),
    ],
    nextCursor: null, hasMore: false,
};

async function boot(opts = {}) {
    const browser = await webkit.launch();
    const ctx = await browser.newContext({
        viewport: { width: opts.width ?? 1440, height: opts.height ?? 900 },
        hasTouch: !!opts.hasTouch, isMobile: !!opts.isMobile,
        colorScheme: opts.colorScheme ?? "light", deviceScaleFactor: 2,
    });
    const page = await ctx.newPage();
    await page.route("**://localhost:3000/**", (r) => {
        const u = r.request().url();
        if (u.includes("/palettes?")) return r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(PAGE) });
        return r.fulfill({ status: 200, contentType: "application/json", body: "{}" });
    });
    await page.goto(`${ORIGIN}/#/browse`, { waitUntil: "load" });
    await page.waitForTimeout(3200);
    return { browser, page };
}

// click the card's TITLE span (guaranteed inside the card body, outside chips)
async function expandByName(page, name) {
    const ok = await page.evaluate((n) => {
        const art = [...document.querySelectorAll('[role="article"]')]
            .find((a) => (a.getAttribute("aria-label") || "").includes(n));
        if (!art) return false;
        const before = art.getBoundingClientRect().height;
        art.click();
        return { before };
    }, name);
    await page.waitForTimeout(900);
    return ok;
}

const CONTRAST_FN = `(function(){
  const c = document.createElement("canvas"); c.width = c.height = 1;
  const x = c.getContext("2d", { willReadFrequently: true });
  window.__resolve = (css) => { x.clearRect(0,0,1,1); x.fillStyle = "#000"; x.fillStyle = css;
    x.fillRect(0,0,1,1); const d = x.getImageData(0,0,1,1).data; return [d[0],d[1],d[2]]; };
  window.__lum = (rgb) => { const [r,g,b] = rgb.map(v => { const s = v/255;
    return s <= 0.04045 ? s/12.92 : ((s+0.055)/1.055)**2.4; });
    return 0.2126*r + 0.7152*g + 0.0722*b; };
  window.__cr = (a,b) => { const [p,q] = [window.__lum(window.__resolve(a)), window.__lum(window.__resolve(b))].sort((m,n)=>n-m);
    return +((p+0.05)/(q+0.05)).toFixed(2); };
})()`;

const out = {};

// ── empty (N = 0) ─────────────────────────────────────────────────────────
{
    const { browser, page } = await boot();
    out.empty_before = await expandByName(page, "Nothing Here");
    out.empty = await page.evaluate(() => {
        const art = [...document.querySelectorAll('[role="article"]')].find((a) => (a.getAttribute("aria-label") || "").includes("Nothing Here"));
        const panel = [...art.querySelectorAll("div")].find((d) => (d.className || "").includes("flex-wrap") && (d.className || "").includes("pb-3"));
        const slugRow = [...art.querySelectorAll("div")].find((d) => (d.className || "").includes("pt-2.5"));
        const strip = art.querySelector(".rounded-t-card, [class*='rounded-t-card']");
        const rr = (e) => e ? { w: +e.getBoundingClientRect().width.toFixed(1), h: +e.getBoundingClientRect().height.toFixed(1) } : null;
        return {
            cardH: +art.getBoundingClientRect().height.toFixed(2),
            stripH: rr(strip),
            slugRow: slugRow && { cls: slugRow.className, ...rr(slugRow) },
            panel: panel && { cls: panel.className, ...rr(panel), children: panel.children.length, text: JSON.stringify(panel.textContent) },
            dots: art.querySelectorAll('[data-testid="watercolor-swatch"]').length,
            emptyMessage: /no colors|empty|add a color/i.test(art.textContent),
        };
    });
    await page.screenshot({ path: "docs/tranches/V/megatranche/audit/components/PaletteCardSwatches/shot-N0-expanded.png", clip: { x: 300, y: 380, width: 700, height: 260 } });
    await browser.close();
}

// ── overflow (N = 24) ─────────────────────────────────────────────────────
{
    const { browser, page } = await boot();
    await expandByName(page, "Twenty Four");
    out.n24 = await page.evaluate(() => {
        const art = [...document.querySelectorAll('[role="article"]')].find((a) => (a.getAttribute("aria-label") || "").includes("Twenty Four"));
        const panel = [...art.querySelectorAll("div")].find((d) => (d.className || "").includes("flex-wrap") && (d.className || "").includes("pb-3"));
        const dots = [...art.querySelectorAll('[data-testid="watercolor-swatch"]')];
        const rows = new Set(dots.map((d) => Math.round(d.getBoundingClientRect().y)));
        return {
            cardH: +art.getBoundingClientRect().height.toFixed(2),
            panelH: panel && +panel.getBoundingClientRect().height.toFixed(2),
            dotCount: dots.length,
            rowCount: rows.size,
            domNodesInPanel: panel ? panel.querySelectorAll("*").length : 0,
            svgFiltersInPanel: panel ? panel.querySelectorAll("svg filter").length : 0,
            maxHeight: panel && getComputedStyle(panel).maxHeight,
            overflow: panel && getComputedStyle(panel).overflow,
            viewportH: innerHeight,
            cardFitsViewport: art.getBoundingClientRect().height <= innerHeight,
        };
    });
    await page.screenshot({ path: "docs/tranches/V/megatranche/audit/components/PaletteCardSwatches/shot-N24-expanded.png" });
    await browser.close();
}

// ── contrast, light + dark, canvas-resolved ───────────────────────────────
for (const scheme of ["light", "dark"]) {
    const { browser, page } = await boot({ colorScheme: scheme });
    await expandByName(page, "Deep Ocean");
    await page.evaluate(CONTRAST_FN);
    out[`contrast_${scheme}`] = await page.evaluate(() => {
        const art = [...document.querySelectorAll('[role="article"]')].find((a) => (a.getAttribute("aria-label") || "").includes("Deep Ocean"));
        const pill = art.querySelector("span.rounded-full.truncate");
        let el = pill.parentElement, bg = "rgba(0, 0, 0, 0)";
        while (el && (bg === "rgba(0, 0, 0, 0)" || bg === "transparent")) { bg = getComputedStyle(el).backgroundColor; el = el.parentElement; }
        const cs = getComputedStyle(pill);
        const icon = art.querySelector('button[aria-label^="Copy slug"] svg');
        return {
            pillInk: cs.color, pillBorder: cs.borderTopColor, cardBg: bg,
            pillVsCard: window.__cr(cs.color, bg),
            borderVsCard: window.__cr(cs.borderTopColor, bg),
            fontSize: cs.fontSize, fontWeight: cs.fontWeight,
            copyIconInk: icon && window.__cr(getComputedStyle(icon).color, bg),
            copyIconColor: icon && getComputedStyle(icon).color,
            ruleVsCard: (() => { const r = art.querySelector(".border-t"); return r ? window.__cr(getComputedStyle(r).borderTopColor, bg) : null; })(),
        };
    });
    await browser.close();
}

// ── mobile, expanded ──────────────────────────────────────────────────────
{
    const { browser, page } = await boot({ width: 390, height: 844, hasTouch: true, isMobile: true });
    await expandByName(page, "Deep Ocean");
    out.mobile = await page.evaluate(() => {
        const art = [...document.querySelectorAll('[role="article"]')].find((a) => (a.getAttribute("aria-label") || "").includes("Deep Ocean"));
        const dots = [...art.querySelectorAll('[data-testid="watercolor-swatch"]')];
        const copy = art.querySelector('button[aria-label^="Copy slug"]');
        const r = (e) => e ? { w: +e.getBoundingClientRect().width.toFixed(1), h: +e.getBoundingClientRect().height.toFixed(1) } : null;
        return {
            cardW: +art.getBoundingClientRect().width.toFixed(1),
            dot: r(dots[0]), dots: dots.length,
            copyBtn: r(copy),
            rows: new Set(dots.map((d) => Math.round(d.getBoundingClientRect().y))).size,
        };
    });
    await page.screenshot({ path: "docs/tranches/V/megatranche/audit/components/PaletteCardSwatches/shot-mobile-expanded.png" });
    await browser.close();
}

console.log(JSON.stringify(out, null, 2));

// CHALLENGE-D pass 2 · PaletteCardMenu — probes for the findings pass 1 did not take.
// Read-only against the live dev server. No source is modified.
import { chromium } from "playwright";
import fs from "node:fs";

const BASE = "http://localhost:9000";
const OUT = new URL("./probe-D6-pass2-results.json", import.meta.url).pathname;

const SAVED = {
    id: "pal-longname-1",
    name: "Muted Terracotta and Deep Sea Foam Study",
    slug: "muted-terracotta-and-deep-sea-foam-study",
    isLocal: true,
    tier: "featured",
    versionCount: 4,
    colors: [
        { css: "#c1663f", name: "terracotta" },
        { css: "#8ec9b0", name: "foam" },
        { css: "#24444d", name: "deep" },
        { css: "#e8dcc0", name: "sand" },
        { css: "#7a4a32", name: "clay" },
    ],
};
const TEMP = {
    id: "__extracted__temp-1",
    name: "Temp",
    slug: "temp",
    isLocal: true,
    colors: [{ css: "#123a5f" }, { css: "#9dc0e8" }],
};

async function seed(page) {
    await page.addInitScript(
        ([a, b]) => {
            localStorage.setItem("color-palettes", JSON.stringify({ version: 1, palettes: [a, b] }));
        },
        [SAVED, TEMP],
    );
}

const R = {};

// ---------------------------------------------------------------- N3/N4/N5/N8
async function openMenuAndMeasure(browser) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await ctx.newPage();
    await seed(page);
    await page.goto(`${BASE}/#/palettes`, { waitUntil: "load" });
    await page.waitForTimeout(3500);
    const trig = page.getByRole("button", { name: "Palette menu" }).first();
    await trig.click();
    await page.waitForTimeout(700);

    // ---- N4: icon gutter — parent item text x vs sub-item text x
    R.gutter = await page.evaluate(() => {
        const items = [...document.querySelectorAll('[role="menuitem"]')];
        const out = [];
        for (const it of items) {
            const r = it.getBoundingClientRect();
            const svg = it.querySelector("svg");
            // first text node's own rect via a range
            let textX = null,
                textNode = null;
            const walk = document.createTreeWalker(it, NodeFilter.SHOW_TEXT);
            while (walk.nextNode()) {
                const t = walk.currentNode;
                if (t.textContent.trim()) {
                    textNode = t;
                    break;
                }
            }
            if (textNode) {
                const rg = document.createRange();
                rg.selectNode(textNode);
                textX = +rg.getBoundingClientRect().left.toFixed(2);
            }
            const cs = getComputedStyle(it);
            out.push({
                text: it.textContent.trim().slice(0, 32),
                itemLeft: +r.left.toFixed(2),
                paddingInlineStart: cs.paddingInlineStart,
                hasIcon: !!svg,
                iconLeft: svg ? +svg.getBoundingClientRect().left.toFixed(2) : null,
                iconW: svg ? +svg.getBoundingClientRect().width.toFixed(2) : null,
                textLeft: textX,
                textInset: textX == null ? null : +(textX - r.left).toFixed(2),
                fontStyle: cs.fontStyle,
                fontFamily: cs.fontFamily.split(",")[0],
                fontSize: cs.fontSize,
            });
        }
        return out;
    });

    // ---- N5: divider budget in parent panel
    R.parentOrder = await page.evaluate(() => {
        const content = document.querySelector('[role="menu"]');
        if (!content) return null;
        const kids = [...content.children];
        return kids.map((k) => ({
            role: k.getAttribute("role"),
            tag: k.tagName,
            cls: (k.className || "").toString().split(" ").slice(0, 2).join(" "),
            text: k.textContent.trim().slice(0, 28),
            y: +k.getBoundingClientRect().top.toFixed(1),
            h: +k.getBoundingClientRect().height.toFixed(1),
        }));
    });

    // ---- N10: reka typeahead source string per item
    R.typeahead = await page.evaluate(() =>
        [...document.querySelectorAll('[role="menuitem"]')].map((i) => ({
            textContent: i.textContent.trim(),
            dataTextValue: i.getAttribute("data-text-value"),
        })),
    );

    // ---- N9: are the leading glyphs hidden from AT?
    R.iconsAria = await page.evaluate(() =>
        [...document.querySelectorAll('[role="menuitem"] svg')].map((s) => ({
            parentText: s.parentElement?.textContent.trim().slice(0, 20),
            ariaHidden: s.getAttribute("aria-hidden"),
            role: s.getAttribute("role"),
            focusable: s.getAttribute("focusable"),
        })),
    );

    // ---- N-hdr: header truncation has no recovery (no title attr)
    R.header = await page.evaluate(() => {
        const l = document.querySelector('[role="menu"] > div:not([role])');
        if (!l) return null;
        const cs = getComputedStyle(l);
        return {
            text: l.textContent.trim(),
            title: l.getAttribute("title"),
            ariaLabel: l.getAttribute("aria-label"),
            scrollW: l.scrollWidth,
            clientW: l.clientWidth,
            color: cs.color,
            fontSize: cs.fontSize,
        };
    });

    // ---- menu vs the list it occludes
    R.occlusion = await page.evaluate(() => {
        const menu = document.querySelector('[role="menu"]')?.getBoundingClientRect();
        const cards = [...document.querySelectorAll('[role="article"]')].map((c) => {
            const r = c.getBoundingClientRect();
            return {
                label: c.getAttribute("aria-label"),
                x: +r.left.toFixed(1),
                y: +r.top.toFixed(1),
                w: +r.width.toFixed(1),
                h: +r.height.toFixed(1),
            };
        });
        const m = menu && { x: +menu.left.toFixed(1), y: +menu.top.toFixed(1), w: +menu.width.toFixed(1), h: +menu.height.toFixed(1) };
        const overlap = (a, b) => {
            const ox = Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x));
            const oy = Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
            return +(ox * oy).toFixed(0);
        };
        return {
            menu: m,
            cards,
            overlapPx: m ? cards.map((c) => ({ label: c.label, area: overlap(m, c), cardArea: +(c.w * c.h).toFixed(0) })) : [],
        };
    });

    await page.screenshot({ path: new URL("./evidence/pass2-desktop-menu-open.png", import.meta.url).pathname });
    await ctx.close();
}

// ---------------------------------------------------------------- N3 offline
async function offlineAnnotation(browser) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await ctx.newPage();
    await seed(page);
    // Force every /api call to fail so the availability latch trips "unavailable".
    await page.route("**/api/**", (r) => r.abort());
    await page.goto(`${BASE}/#/palettes`, { waitUntil: "load" });
    await page.waitForTimeout(4000);
    const trig = page.getByRole("button", { name: "Palette menu" }).first();
    await trig.click();
    await page.waitForTimeout(700);
    R.offline = await page.evaluate(() => {
        const items = [...document.querySelectorAll('[role="menuitem"]')];
        const pub = items.find((i) => /Publish/.test(i.textContent));
        if (!pub) return { found: false, items: items.map((i) => i.textContent.trim()) };
        const cs = getComputedStyle(pub);
        const ann = pub.querySelector("span");
        const acs = ann && getComputedStyle(ann);
        // effective alpha = item opacity * annotation opacity
        return {
            found: true,
            itemText: pub.textContent.trim(),
            ariaDisabled: pub.getAttribute("aria-disabled"),
            dataDisabled: pub.getAttribute("data-disabled"),
            itemOpacity: cs.opacity,
            itemColor: cs.color,
            annText: ann?.textContent,
            annOpacity: acs?.opacity,
            annColor: acs?.color,
            annFontSize: acs?.fontSize,
            effectiveAlpha: acs ? +(parseFloat(cs.opacity) * parseFloat(acs.opacity)).toFixed(4) : null,
            menuBg: getComputedStyle(document.querySelector('[role="menu"]')).backgroundColor,
        };
    });
    await page.screenshot({ path: new URL("./evidence/pass2-offline-annotation.png", import.meta.url).pathname });
    await ctx.close();
}

// ---------------------------------------------------------------- N1 mix nest
async function mixNesting(browser) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await ctx.newPage();
    await seed(page);
    await page.goto(`${BASE}/#/mix`, { waitUntil: "load" });
    await page.waitForTimeout(3000);
    // try to reach the Palettes source mode
    const tab = page.getByRole("tab", { name: /palettes/i }).first();
    if (await tab.count()) {
        await tab.click().catch(() => {});
        await page.waitForTimeout(1200);
    } else {
        const btn = page.getByRole("button", { name: /palettes/i }).first();
        if (await btn.count()) await btn.click().catch(() => {});
        await page.waitForTimeout(1200);
    }
    R.mix = await page.evaluate(() => {
        const nested = [...document.querySelectorAll("button button, button [role='menuitem'], button a[href]")];
        const cards = [...document.querySelectorAll("button [role='article']")];
        return {
            nestedInteractiveInButton: nested.length,
            nestedSample: nested.slice(0, 6).map((n) => ({
                tag: n.tagName,
                label: n.getAttribute("aria-label") || n.textContent.trim().slice(0, 24),
                outerLabel: n.closest("button[aria-pressed]")?.getAttribute("aria-label"),
            })),
            paletteCardsInsideButton: cards.length,
            cardSample: cards.slice(0, 3).map((c) => c.getAttribute("aria-label")),
        };
    });
    await page.screenshot({ path: new URL("./evidence/pass2-mix-source.png", import.meta.url).pathname });
    await ctx.close();
}

// ---------------------------------------------------------------- N2 extract
async function extractDeadExport(browser) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await ctx.newPage();
    await seed(page);
    const downloads = [];
    page.on("download", (d) => downloads.push(d.suggestedFilename()));
    const errs = [];
    page.on("console", (m) => m.type() === "error" && errs.push(m.text()));
    await page.goto(`${BASE}/#/extract`, { waitUntil: "load" });
    await page.waitForTimeout(3000);
    R.extract = await page.evaluate(() => ({
        paletteMenus: document.querySelectorAll('button[aria-label="Palette menu"]').length,
        articles: [...document.querySelectorAll('[role="article"]')].map((a) => a.getAttribute("aria-label")),
    }));
    R.extract.downloads = downloads;
    R.extract.consoleErrors = errs.slice(0, 3);
    await ctx.close();
}

const browser = await chromium.launch();
try {
    await openMenuAndMeasure(browser);
} catch (e) {
    R.gutterError = String(e).slice(0, 300);
}
try {
    await offlineAnnotation(browser);
} catch (e) {
    R.offlineError = String(e).slice(0, 300);
}
try {
    await mixNesting(browser);
} catch (e) {
    R.mixError = String(e).slice(0, 300);
}
try {
    await extractDeadExport(browser);
} catch (e) {
    R.extractError = String(e).slice(0, 300);
}
await browser.close();
fs.writeFileSync(OUT, JSON.stringify(R, null, 1));
console.log(JSON.stringify(R, null, 1));
